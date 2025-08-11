import { reactive } from 'vue'
const state = reactive({
  search: {},
  loading: false,
  error: null,
})

const postSearch = async (data) => {
  console.log('Searching for:', data)
  state.loading = true
  state.error = null

  try {
    const response = await fetch('https://api.atrialfa.shop/v2/listSearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    console.log('Response:', response)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const res = await response.json()
    state.search = res
  } catch (error) {
    console.error('Error fetching search results:', error)
    state.error = error.message
  } finally {
    state.loading = false
  }
}

export const usePostsSearch = () => {
  return { state, postSearch }
}
