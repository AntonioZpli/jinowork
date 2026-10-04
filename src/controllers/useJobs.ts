import { computed, ref } from 'vue'
import type { Job } from '@/models/Job'
import { EDUCATION_REQUIREMENTS, EMPLOYMENT_TYPES, EXPERIENCE_LEVELS, PROFESSIONAL_AREAS, WORK_MODALITIES, areaForLabel } from '@/data/professionalTaxonomy'
import { calculateCandidateJobMatch } from '@/services/jobMatching'
import { useAuthStore } from '@/stores/useAuthStore'
import { useJobsStore } from '@/stores/useJobsStore'

export function useJobs() {
  const store = useJobsStore()
  const allJobs = computed(() => store.jobs)
  const searchQuery = ref('')
  const selectedModality = ref<'Todas' | Job['modality']>('Todas')
  const selectedSeniority = ref<'Todas' | Job['seniority']>('Todas')
  const selectedCategory = ref('Todas')
  const selectedAreaId = ref('Todas')
  const selectedSpecializationId = ref('Todas')
  const selectedContract = ref<'Todos' | Job['contract']>('Todos')
  const selectedLocation = ref('Todas')
  const selectedEducation = ref('Todas')
  const modalities: Array<'Todas' | Job['modality']> = ['Todas', ...WORK_MODALITIES]
  const seniorities: Array<'Todas' | Job['seniority']> = ['Todas', ...EXPERIENCE_LEVELS]
  const contracts: Array<'Todos' | Job['contract']> = ['Todos', ...EMPLOYMENT_TYPES]
  const areas = PROFESSIONAL_AREAS
  const specializations = computed(() => selectedAreaId.value === 'Todas' ? PROFESSIONAL_AREAS.flatMap(area => area.specializations) : (PROFESSIONAL_AREAS.find(area => area.id === selectedAreaId.value)?.specializations || []))
  const categories = computed(() => ['Todas', ...Array.from(new Set(allJobs.value.map(job => job.category))).sort()])
  const locations = computed(() => [...new Set(allJobs.value.map(job => job.municipality || job.location.split(',')[0].trim()))].sort())

  const filteredJobs = computed(() => allJobs.value.filter(job => {
    const query = searchQuery.value.toLocaleLowerCase().trim()
    if (query && ![job.title, job.company, job.location, job.category, ...job.tags].some(value => value.toLocaleLowerCase().includes(query))) return false
    if (selectedModality.value !== 'Todas' && job.modality !== selectedModality.value) return false
    if (selectedSeniority.value !== 'Todas' && job.seniority !== selectedSeniority.value) return false
    if (selectedCategory.value !== 'Todas' && job.category !== selectedCategory.value) return false
    if (selectedAreaId.value !== 'Todas' && (job.areaId || areaForLabel(job.category)?.id) !== selectedAreaId.value) return false
    if (selectedSpecializationId.value !== 'Todas' && job.specializationId !== selectedSpecializationId.value) return false
    if (selectedContract.value !== 'Todos' && job.contract !== selectedContract.value) return false
    if (selectedEducation.value !== 'Todas' && job.educationRequirements?.length) {
      const applicantLevel = EDUCATION_REQUIREMENTS.indexOf(selectedEducation.value as typeof EDUCATION_REQUIREMENTS[number])
      const minimumJobLevel = Math.min(...job.educationRequirements.map(level => EDUCATION_REQUIREMENTS.indexOf(level as typeof EDUCATION_REQUIREMENTS[number])).filter(level => level >= 0))
      if (minimumJobLevel > applicantLevel) return false
    }
    if (selectedLocation.value !== 'Todas' && !(job.municipality || job.location.split(',')[0].trim()).toLocaleLowerCase().includes(selectedLocation.value.toLocaleLowerCase())) return false
    return job.status !== 'closed'
  }))

  const recommendedJobs = computed(() => {
    const candidate = useAuthStore().user
    if (!candidate || candidate.role !== 'candidate') return filteredJobs.value
    return [...filteredJobs.value].sort((a, b) => calculateCandidateJobMatch(candidate, b).score - calculateCandidateJobMatch(candidate, a).score)
  })

  function resetFilters() {
    searchQuery.value = ''
    selectedModality.value = 'Todas'
    selectedSeniority.value = 'Todas'
    selectedCategory.value = 'Todas'
    selectedAreaId.value = 'Todas'
    selectedSpecializationId.value = 'Todas'
    selectedContract.value = 'Todos'
    selectedLocation.value = 'Todas'
    selectedEducation.value = 'Todas'
  }

  function selectArea(areaId: string) {
    selectedAreaId.value = areaId
    selectedSpecializationId.value = 'Todas'
  }

  return {
    searchQuery, selectedModality, selectedSeniority, selectedCategory, selectedAreaId, selectedSpecializationId, selectedContract, selectedLocation, selectedEducation,
    modalities, seniorities, contracts, areas, specializations, categories, locations, educationLevels: ['Todas', ...EDUCATION_REQUIREMENTS], filteredJobs, recommendedJobs,
    totalJobs: computed(() => allJobs.value.filter(job => job.status !== 'closed').length),
    resetFilters, selectArea, allJobs, addJob: store.addJob, setJobStatus: store.setJobStatus,
  }
}
