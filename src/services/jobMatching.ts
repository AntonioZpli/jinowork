import type { Job } from '@/models/Job'
import type { User } from '@/models/User'
import { areaForLabel } from '@/data/professionalTaxonomy'

export interface MatchFactor {
  key: string
  label: string
  score: number
  detail: string
}

export interface JobMatch {
  score: number
  factors: MatchFactor[]
}

function candidateAreaIds(candidate: User) {
  return new Set([
    ...(candidate.professionalAreaId ? [candidate.professionalAreaId] : []),
    ...(candidate.secondaryAreaIds || []),
    ...(candidate.preferredCategories || []).map(label => areaForLabel(label)?.id).filter((id): id is string => !!id),
    ...(candidate.interests || []).map(label => areaForLabel(label)?.id).filter((id): id is string => !!id),
  ])
}

function candidateSkillIds(candidate: User) {
  return new Set([...(candidate.skillIds || []), ...(candidate.skills || []).map(skill => skill.toLocaleLowerCase())])
}

export function calculateCandidateJobMatch(candidate: User, job: Job): JobMatch {
  const factors: MatchFactor[] = []
  const areaId = job.areaId || areaForLabel(job.category)?.id
  if (areaId) {
    const match = candidateAreaIds(candidate).has(areaId)
    factors.push({ key: 'area', label: 'Área profesional', score: match ? 100 : 0, detail: match ? 'Coincide con tus áreas de interés' : 'El área no está entre tus intereses' })
  }

  if (job.specializationId) {
    const match = candidate.specializationIds?.includes(job.specializationId) || false
    factors.push({ key: 'specialization', label: 'Especialización', score: match ? 100 : 0, detail: match ? 'Coincide tu especialización' : 'No aparece en tu perfil' })
  }

  const requiredSkills = job.requiredSkillIds?.length ? job.requiredSkillIds : job.tags.map(tag => tag.toLocaleLowerCase())
  if (requiredSkills.length) {
    const candidateSkills = candidateSkillIds(candidate)
    const matched = requiredSkills.filter(skill => candidateSkills.has(skill.toLocaleLowerCase())).length
    factors.push({ key: 'skills', label: 'Habilidades', score: Math.round(matched / requiredSkills.length * 100), detail: `${matched} de ${requiredSkills.length} habilidades requeridas` })
  }

  const experienceRequired = job.minimumExperienceYears ?? ({ Senior: 5, Mid: 2, Junior: 0, 'Sin experiencia': 0 } as Record<string, number>)[job.seniority] ?? 0
  if (experienceRequired > 0) {
    const years = candidate.experienceYears || 0
    factors.push({ key: 'experience', label: 'Experiencia', score: Math.min(100, Math.round(years / experienceRequired * 100)), detail: `${years} de ${experienceRequired} años requeridos` })
  }

  if (job.educationRequirements?.length) {
    const levels = ['Secundaria', 'Técnico', 'Universidad en curso', 'Licenciatura', 'Posgrado']
    const requiredLevel = Math.min(...job.educationRequirements.map(level => levels.indexOf(level)).filter(index => index >= 0))
    const degreeText = (candidate.education || []).map(item => `${item.degree} ${item.field}`).join(' ').toLocaleLowerCase()
    const candidateLevel = /posgrado|maestr|doctor/.test(degreeText) ? 4 : /licen|ingenier|abogad/.test(degreeText) ? 3 : /universidad|en curso/.test(degreeText) ? 2 : /t[eé]cnic/.test(degreeText) ? 1 : /bachiller|secundaria/.test(degreeText) ? 0 : -1
    const match = requiredLevel >= 0 && candidateLevel >= requiredLevel
    factors.push({ key: 'education', label: 'Formación', score: match ? 100 : 0, detail: match ? 'Cumples el nivel de formación indicado' : 'Tu perfil no registra el nivel requerido' })
  }

  const modality = candidate.preferredModality
  if (modality) {
    const match = modality === job.modality || modality.toLocaleLowerCase() === 'cualquiera'
    factors.push({ key: 'modality', label: 'Modalidad', score: match ? 100 : 0, detail: match ? 'Se ajusta a tu preferencia' : 'Difiere de tu modalidad preferida' })
  }

  if (candidate.preferredEmploymentTypes?.length) {
    const match = candidate.preferredEmploymentTypes.includes(job.contract)
    factors.push({ key: 'employment', label: 'Tipo de empleo', score: match ? 100 : 0, detail: match ? 'Coincide con tu preferencia' : 'No coincide con tu preferencia de empleo' })
  }

  const wantedLocations = candidate.preferredLocations || [candidate.location || candidate.department || ''].filter(Boolean)
  if (wantedLocations.length) {
    const jobLocation = `${job.location} ${job.department || ''} ${job.municipality || ''}`.toLocaleLowerCase()
    const match = wantedLocations.some(location => jobLocation.includes(location.toLocaleLowerCase()))
    factors.push({ key: 'location', label: 'Ubicación', score: match ? 100 : 0, detail: match ? 'La ubicación coincide' : 'La ubicación no coincide con tu preferencia' })
  }

  const score = factors.length ? Math.round(factors.reduce((sum, factor) => sum + factor.score, 0) / factors.length) : 0
  return { score, factors }
}

export function calculateProfileCompletion(candidate: User) {
  const checks = [
    { id: 'basic', label: 'Información básica', complete: Boolean(candidate.name && candidate.email && (candidate.location || candidate.department)) },
    { id: 'area', label: 'Área profesional', complete: Boolean(candidate.professionalAreaId || candidate.preferredCategories?.length || candidate.interests?.length) },
    { id: 'skills', label: 'Habilidades', complete: Boolean(candidate.skillIds?.length || candidate.skills?.length) },
    { id: 'experience', label: 'Experiencia', complete: Boolean(candidate.experience?.length || candidate.experienceYears) },
    { id: 'education', label: 'Formación', complete: Boolean(candidate.education?.length) },
    { id: 'preferences', label: 'Preferencias laborales', complete: Boolean(candidate.preferredModality || candidate.preferredEmploymentTypes?.length) },
  ]
  const completeCount = checks.filter(check => check.complete).length
  return { checks, percentage: Math.round(completeCount / checks.length * 100), next: checks.find(check => !check.complete) }
}
