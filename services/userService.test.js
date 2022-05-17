const userService = require('../services/userService')

describe('User service test', () => {

    const avatarUrl = '//www.gravatar.com/avatar/93942e96f5acd83e2e047ad8fe03114d?s=200&r=pg&d=mm'
    const testData = {
        name: 'name',
        email: 'test@email.com',
        avatarUrl: avatarUrl,
        password: '123456'
    }

    it('should create user avatar', () => {
        const url = userService.createAvatar(testData.email)
        expect(url).toEqual(testData.avatarUrl)
    })

    it('should create new User', () => {
        const { name, email, avatarUrl, password } = testData
        const user = userService.createUser(
            name, email, avatarUrl, password
        )
        expect(user).toHaveProperty('_id')
    })

    it('should hash a password', async () => {
        const hashedPassword = await userService.encryptPassword(testData.password)
        expect(hashedPassword.length).toBeGreaterThan(testData.password.length)
    })

    it('should create user auth token', async () => {
        const payload = { user: { id: 'userid' } }
        const response = await userService
            .generateUserToken(payload)
        expect(response).toHaveProperty('token')
    })

})