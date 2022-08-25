import { takeLatest } from '@ali/wind-effect-creator'
import * as constants from './constants'
import { get, put as jsonPut, post } from '../../utils/fetch'

const initialState = {
  list: [],
  providerDefinitionList: [
    {
      alterId: 0,
      httpDefinition: '',
      httpMethod: '',
      httpPath: '',
      id: 0,
      popName: '请选择popApi',
      popProduct: '',
      popVersion: '',
      serviceId: 0,
      value: '',
      requestExample: '',
      responseExample: '',
      key: new Date().valueOf(),
      error: false,
    },
  ],
  apiList: [
    {
      value: '/pet+get',
      label: '/PET+GET',
    },
    {
      value: '/pet+post',
      label: '/PET+POST',
    },
  ],
  // 添加poplist
  popList: [],
  scList: [],
  scId: '',
  scContent: '',
  // 是不是编辑状态
  isEdith: false,
  detailInfo: {},
  groupName: '',
  errorCodes: [],
  shouldExamSwagger: true,
}

export default {
  namespace: constants.NAMESPACE,
  state: initialState,
  reducers: {
    upData(state, action) {
      const { payload = {} } = action
      return {
        ...state,
        ...payload,
      }
    },
    // 副本数
    updateCopyCount(state) {
      return {
        ...state,
      }
    },
    // 添加接口模块 getModelList
    upDateModel(state, action) {
      const { payload = [] } = action
      return {
        ...state,
        providerDefinitionList: [...payload],
      }
    },
    // 修改原接口
    upDateApi(state, action) {
      const { payload = [] } = action
      return {
        ...state,
        providerDefinitionList: [...payload],
      }
    },
    upDatePopList(state, action) {
      const { payload = [] } = action
      return {
        ...state,
        popList: [...payload],
      }
    },
    upScriptList(state, action) {
      const { payload = [] } = action
      return {
        ...state,
        scList: [...payload],
      }
    },
    upScriptId(state, action) {
      const { payload = '' } = action
      return {
        ...state,
        scId: payload,
      }
    },
    upScriptContent(state, action) {
      const { payload = '' } = action
      return {
        ...state,
        scContent: payload,
      }
    },
    changeEditModel(state, action) {
      const { payload = false } = action
      return {
        ...state,
        isEdith: payload,
      }
    },
    initApiData(state, action) {
      const { payload = {} } = action
      return {
        ...state,
        ...payload,
      }
    },
    changeApiList(state, action) {
      const { payload = [] } = action
      return {
        ...state,
        apiList: [...payload],
      }
    },
    resetInfo(state) {
      return {
        ...state,
        providerDefinitionList: [
          {
            alterId: 0,
            httpDefinition: '',
            httpMethod: '',
            httpPath: '',
            id: 0,
            popName: '请选择popApi',
            popProduct: '',
            popVersion: '',
            serviceId: 0,
            value: '',
            key: new Date().valueOf(),
            error: false,
          },
        ],
        apiList: [
          {
            value: '/pet+get',
            label: '/PET+GET',
          },
          {
            value: '/pet+post',
            label: '/PET+POST',
          },
        ],
        errorCodes: [],
        shouldExamSwagger: true,
      }
    },
  },
  effects: {
    // 脚本检测 POST /api/script/run/dry
    checkSc: takeLatest(function* ({ payload = null }) {
      const {
        param,
        callback,
      } = payload
      const res = yield post('/api/script/run/dry', param, true);
      callback && callback(res)
    }),
    // GET /api/pop/meta/list
    getPopList: takeLatest(function* ({ payload = null }, { put }) {
      const res = yield get('/api/pop/meta/list', payload, true);
      if (res && res.data) {
        const {
          data = [],
        } = res
        data.map((item, ind) => {
          item.value = ind
          item.label = item.name
          return item
        })
        yield put({
          type: 'upDatePopList',
          payload: data,
        })
      }
    }),
    // 获取脚本信息 GET /api/service/script/list/{serviceId}/{providerMethod}/{providerPath}/{scriptType}
    getScript: takeLatest(function* ({ payload = null }, { put }) {
      const getUrl = '/api/service/script/list/'
        + payload.serviceId
        + '/' + payload.scriptType
      const res = yield get(getUrl, {}, true);
      if (res && res.data) {
        const {
          data = [],
        } = res
        const target = [];
        data.map(item => {
          target.push({
            value: item.id,
            label: item.id,
          })
          return item
        })
        console.log(target)
        yield put({
          type: 'upScriptList',
          payload: target,
        })
      }
    }),
    // 获取脚本内容
    getScriptContent: takeLatest(function* ({ payload = {} }, { put }) {
      const {
        value,
        callback,
      } = payload
      // GET /api/service/script/detail/{
      const res = yield get('/api/service/script/detail/' + value, {}, true);
      if (res && res.data) {
        const {
          data = {},
        } = res
        yield put({
          type: 'upScriptContent',
          payload: data.content,
        })
        callback && callback(data.content)
      } else {
        callback && callback('')
      }
    }),
    // 获取脚本样本
    getScriptSampleList: takeLatest(function* ({ payload = {} }) {
      const {
        param,
        callback,
      } = payload
      const res = yield get('/api/service/alteration/getScriptTemplates', param);
      const {
        data = [],
        success,
      } = res
      if (success && data && data.length) {
        callback && callback(data)
      } else {
        callback && callback([])
      }
    }),
    getScriptSample: takeLatest(function* ({ payload = {} }, { put }) {
      const {
        param,
        callback,
      } = payload
      const res = yield get('/api/service/alteration/getScriptTemplateContent', param);
      if (res && res.data) {
        yield put({
          type: 'upScriptContent',
          payload: res.data,
        })
        callback && callback(res.data)
      } else {
        callback && callback('')
      }
    }),
    getErrorCodes: takeLatest(function* ({ payload = {} }) {
      const {
        callback,
      } = payload
      const res = yield get('/api/service/alteration/getPopErrorCodeList', {});
      const {
        data = [],
        success,
      } = res
      if (success && data && data.length) {
        const target = []
        data.map(item => {
          target.push({
            label: `${item.name}(${item.code})`,
            value: item.name,
          })
          return item
        })
        callback && callback(target)
      } else {
        callback && callback([])
      }
    }),
    // 添加脚本PUT /api/service/script
    addScript: takeLatest(function* ({ payload = {} }, { put }) {
      const {
        value,
        callback,
      } = payload
      const {
        data = {},
      } = yield jsonPut('/api/service/script', value, true);
      yield put({
        type: 'upScriptId',
        payload: data.id,
      })
      callback && callback(data.id)
    }),
    loadCheckParam: takeLatest(function* ({ payload = {} }) {
      const {
        value: {
          popName,
          popProduct,
          popVersion,
        } = {},
        callback,
      } = payload
      const res = yield get(`/api/pop/meta/detail/PROD/${popProduct}/${popVersion}/${popName}`, null, false);
      callback && callback(res)
    }),
    // GET /api/accessParty/get
    getGrounpName: takeLatest(function* ({ payload = {} }, { put }) {
      const {
        param,
      } = payload
      const {
        data: {
          name = '',
        } = {},
      } = yield get('/api/accessParty/get', param, true);
      yield put({
        type: 'upData',
        payload: { groupName: name },
      })
    }),
  },
  subscriptions: {
    // setup({ dispatch }) {
    //   dispatch({ type: 'getPopList' })
    // },
  },
}
