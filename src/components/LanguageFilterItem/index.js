// Write your code here
import {Component} from 'react'
import './index.css'

class LanguageFilterItem extends Component {
  onChangeSelectedLanguage = language => {
    const {onChangeSelectedLanguage} = this.props
    onChangeSelectedLanguage(language)
  }

  render() {
    const {languageFiltersData, repositoryId} = this.props
    return (
      <div className="language-filter-item-container">
        <ul className="language-names-ul">
          {languageFiltersData.map(eachLanguage => (
            <li key={eachLanguage.id}>
              <button
                className={
                  repositoryId === eachLanguage.id
                    ? 'selected-language-name language-name'
                    : 'language-name'
                }
                type="button"
                onClick={() => this.onChangeSelectedLanguage(eachLanguage.id)}
              >
                {eachLanguage.language}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default LanguageFilterItem
