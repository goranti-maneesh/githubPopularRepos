// Write your code here
import {Component} from 'react'
import './index.css'

class RepositoryItem extends Component {
  render() {
    const {selectedRepositoriesList} = this.props
    return (
      <div className="repository-item-container">
        <ul className="repository-item-ul">
          {selectedRepositoriesList.map(eachRepository => (
            <li key={eachRepository.id} className="each-repository-li">
              <div className="each-repository-container">
                <img
                  src={eachRepository.avatarUrl}
                  alt="repository-logo"
                  className="repository-logo"
                />
                <h1 className="repository-name">{eachRepository.name}</h1>
                <div>
                  <div className="repository-details-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
                      alt="stars"
                      className="repository-details-image"
                    />
                    <p className="repository-details">{`${eachRepository.starsCount} stars`}</p>
                  </div>
                  <div className="repository-details-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
                      alt="forks"
                      className="repository-details-image"
                    />
                    <p className="repository-details">{`${eachRepository.forksCount} forks`}</p>
                  </div>
                  <div className="repository-details-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
                      alt="open-issues"
                      className="repository-details-image"
                    />
                    <p className="repository-details">{`${eachRepository.issuesCount} open issues`}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default RepositoryItem
