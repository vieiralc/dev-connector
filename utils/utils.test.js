const { STATUS_200 } = require('../commons/constants')
const requestData = require('../mock/requestData/requestData.mock')
const { getErrorMessages, sendRequest, findIndexOf } = require('./utils')

describe('Utils test', () => {

    it('should get all 3 error messages returned by api', () => {
        const response = {
            text: '{"errors":[{"msg":"School is required"},{"msg":"Degree is required"},{"msg":"Field of study is required"}]}'
        }
        const errorsQuantity = 3

        const result = getErrorMessages(response, errorsQuantity)
        expect(Array.isArray(result)).toBe(true)
        expect(result.length).toEqual(3)
    })

    it('should use supertest to create a request', async () => {
        requestData.api = '/api/profile/all'
        requestData.method = 'get'
        
        const response = await sendRequest(requestData)
        expect(response.statusCode).toEqual(STATUS_200)
    })

    it('should find index of an item and return it', () => {
        const arr = [ { id: 'foo' }, { id: 'baz'}, { id: 'abcd' } ]
        const result = findIndexOf(arr, 'abcd')
        expect(result).toEqual(2)
    })

})