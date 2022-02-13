import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    repositoryId: 'ALL',
    apiStatus: apiStatusConstants.initial,
    selectedRepositoriesList: [],
  }

  componentDidMount() {
    this.fetchRepositoriesList()
  }

  fetchRepositoriesList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {repositoryId} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${repositoryId}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedRepositoryDetailNames = data.popular_repos.map(
        eachRepositoryList => ({
          avatarUrl: eachRepositoryList.avatar_url,
          forksCount: eachRepositoryList.forks_count,
          id: eachRepositoryList.id,
          issuesCount: eachRepositoryList.issues_count,
          name: eachRepositoryList.name,
          starsCount: eachRepositoryList.stars_count,
        }),
      )

      this.setState({
        selectedRepositoriesList: updatedRepositoryDetailNames,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSelectedLanguage = language => {
    this.setState(
      {
        repositoryId: language,
      },
      this.fetchRepositoriesList,
    )
  }

  getRepositoriesList = () => {
    const {selectedRepositoriesList} = this.state

    return (
      <div>
        <RepositoryItem selectedRepositoriesList={selectedRepositoriesList} />
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure-view"
          className="failure-view-image"
        />
      </div>
      <h1 className="failure-view-title">Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  viewApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getRepositoriesList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {repositoryId} = this.state
    return (
      <div className="github-repos-container">
        <h1 className="popular-heading">Popular</h1>
        <div>
          <LanguageFilterItem
            languageFiltersData={languageFiltersData}
            repositoryId={repositoryId}
            onChangeSelectedLanguage={this.onChangeSelectedLanguage}
          />
        </div>
        <div>{this.viewApiStatus()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
