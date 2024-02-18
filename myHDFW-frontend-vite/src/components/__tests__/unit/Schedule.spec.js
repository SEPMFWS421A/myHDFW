import {describe, expect, it} from 'vitest'

import {mount} from '@vue/test-utils'
import Schedule from '../Schedule.vue'

describe('Schedule', () => {
    it('renders properly', () => {
        const wrapper = mount(Schedule, { props: { msg: 'Hello Vitest' } })
        expect(wrapper.text()).toContain('Hello Vitest')
    })
})