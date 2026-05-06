import { describe, it, expect } from 'vitest'
import { validateEmail, validatePassword, isPasswordValid } from '../utils/validations'

describe('validateEmail', () => {
    it('acepta un email válido', () => {
        expect(validateEmail('usuario@gmail.com')).toBe(true)
    })
    it('rechaza un email sin @', () => {
        expect(validateEmail('usuariogmail.com')).toBe(false)
    })
    it('rechaza un email sin dominio', () => {
        expect(validateEmail('usuario@')).toBe(false)
    })
    it('rechaza una cadena vacía', () => {
        expect(validateEmail('')).toBe(false)
    })
})

describe('validatePassword', () => {
    it('detecta longitud mínima correctamente', () => {
        expect(validatePassword('Ab1!efgh').minLength).toBe(true)
        expect(validatePassword('Ab1!').minLength).toBe(false)
    })
    it('detecta mayúscula', () => {
        expect(validatePassword('Ab1!efgh').hasUppercase).toBe(true)
        expect(validatePassword('ab1!efgh').hasUppercase).toBe(false)
    })
    it('detecta número', () => {
        expect(validatePassword('Abcdefg!').hasNumber).toBe(false)
        expect(validatePassword('Abcdef1!').hasNumber).toBe(true)
    })
    it('detecta carácter especial', () => {
        expect(validatePassword('Abcdef1!').hasSpecial).toBe(true)
        expect(validatePassword('Abcdef12').hasSpecial).toBe(false)
    })
})

describe('isPasswordValid', () => {
    it('valida contraseña completa correcta', () => {
        expect(isPasswordValid('Abcdef1!')).toBe(true)
    })
    it('rechaza contraseña incompleta', () => {
        expect(isPasswordValid('abcdefgh')).toBe(false)
    })
})