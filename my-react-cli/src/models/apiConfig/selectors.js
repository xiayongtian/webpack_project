import { createSelector } from 'reselect' // eslint-disable-line

export const getState = (state) => state[cons.NAMESPACE] //eslint-disable-line
export const changeState = (state) => state[changeCons.NAMESPACE]



export const getCheckModel = createSelector(
  getState,
  state => ({
    errorCodes: state.errorCodes,
    shouldExamSwagger: state.shouldExamSwagger,
  })
)
