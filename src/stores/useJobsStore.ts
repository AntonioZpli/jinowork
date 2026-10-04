import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Job } from '@/models/Job'
import { MOCK_JOBS } from '@/data/jobs'

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<Job[]>([...MOCK_JOBS])

  function addJob(job: Omit<Job, 'id' | 'postedAt' | 'featured' | 'status'>) {
    const nextId = Math.max(0, ...jobs.value.map(item => item.id)) + 1
    const newJob: Job = { ...job, id: nextId, postedAt: 'Hoy', featured: false, status: 'active' }
    jobs.value = [newJob, ...jobs.value]
    return newJob
  }

  function setJobStatus(jobId: number, status: 'active' | 'closed') {
    jobs.value = jobs.value.map(job => job.id === jobId ? { ...job, status } : job)
  }

  return { jobs, addJob, setJobStatus }
})
