export default class UserInfo {
  constructor ({nameSelector, descriptionSelector}) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo () {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo ({ userName, userDescription }) {
    this._name.textContent = userName;
    this._description.textContent = userDescription;
  }
}