#### 1.4.1 (2019-06-03)

##### Chores

* **deps:**  install and configure changelog generator ([5e842825](https://github.com/CodeTanzania/emis-resource/commit/5e842825b0fb109d7a656136fcd7ef5675045688))
* **package.json:**  update package version to 1.4.1 ([29c175d0](https://github.com/CodeTanzania/emis-resource/commit/29c175d0d30b5c4fb0cb403fa6bbdc2b9683c257))
*  ignore configuration files ([173d202f](https://github.com/CodeTanzania/emis-resource/commit/173d202fc027ba4f80ba36f3580265c108de3a0b))
*  remove unused jsbeautify file ([5294a56c](https://github.com/CodeTanzania/emis-resource/commit/5294a56c0a6fd1c694b97d25295233afdf506504))
*  install and configure prettier ([3b492867](https://github.com/CodeTanzania/emis-resource/commit/3b4928674d5e1d7411dfa1eef0d851926e4fff33))
*  ignore neovim editor configs ([5e284bb6](https://github.com/CodeTanzania/emis-resource/commit/5e284bb6dadc89fd247d9ac31a01c80b69e2486f))
* **.gitignore:**  ignore configuration folders ([ae59517e](https://github.com/CodeTanzania/emis-resource/commit/ae59517e3a19e4a343405f145a8a05999102ae03))

##### Refactors

* **predefines:**  use latest api ([38b967d8](https://github.com/CodeTanzania/emis-resource/commit/38b967d8f14e1ea1f5a7210ee8462011bb31ea34))
*  use latest api ([9e2f558c](https://github.com/CodeTanzania/emis-resource/commit/9e2f558c5fb907c4f79ac75976ab8686ff052432))
* **model:**
  *  re-implement adjustment seed to use new API ([23e323fb](https://github.com/CodeTanzania/emis-resource/commit/23e323fb86d3f214e6a951713e635503aea1d6d5))
  *  re-implement stocks seed to use new API ([9fcadb5f](https://github.com/CodeTanzania/emis-resource/commit/9fcadb5fe525ff6b476fc35d2c12199411f48208))
  *  re-implement item seed to use new API ([55e37498](https://github.com/CodeTanzania/emis-resource/commit/55e37498acf064de53cb11d1d31ddd506d92a977))

##### Code Style Changes

*  format files with prettier ([63c5e65b](https://github.com/CodeTanzania/emis-resource/commit/63c5e65b57782df1cbee62e903d1ba00dd393c5d))

##### Tests

*  remove unused console.log ([7cc55d51](https://github.com/CodeTanzania/emis-resource/commit/7cc55d510c93fa950990cfccc13eec45b70f5601))

#### 1.4.0 (2019-05-30)

##### Chores

* **deps:**
  *  force latest version & audit fix ([4a146f7b](https://github.com/CodeTanzania/emis-resource/commit/4a146f7b160aa1c38d4f239b4cd4954e530011b6))
  *  force latest version & audit fix ([2b11eeb4](https://github.com/CodeTanzania/emis-resource/commit/2b11eeb487c6cc7a0aa12e8067ad73cddbe7f4b2))
*  force latest dependencies ([37fa7ad6](https://github.com/CodeTanzania/emis-resource/commit/37fa7ad6c0861457119bf11b67d3b10758f1a4d1))

##### Refactors

* **deps:**  migrate to new apis ([87de6dd0](https://github.com/CodeTanzania/emis-resource/commit/87de6dd0f47abf571cf8c02bd4462b8e795923c0))

#### 1.3.0 (2019-01-29)

##### New Features

*  add uom on item autopopulate ([f1770165](https://github.com/CodeTanzania/emis-resource/commit/f1770165c5384783622f3a5d87d6b82c87b65954))

# 1.2.2 / 24-12-2018
- Build latest apidoc
- Force latest dependencies & audit fix
- Refactor and improve specs readability

# 1.2.1 / 17-12-2018
- Force latest emis-stakeholder dependency
- Build latest apidoc

# 1.1.0 / 07-12-2018
- Build latest apidoc
- Improve example app
- Add taggable plugin
- Improve integration specs to use mongoose-test-helpers

# 1.1.0 / 07-12-2018
- Build latest apidoc
- Refactor adjustment integration specs to include stock, store and party
- Add warehouse router
- Add warehouse router specs
- Improve main export jsdoc
- Add stock field in adjustment
- Add store field in adjustment

# 1.0.0 / 21-11-2018
- Implement initial item, stock, adjustment data model
- Implement item, stock and ajustment http routers
- Build latest apidoc
