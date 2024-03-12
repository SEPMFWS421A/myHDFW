/*
import { mount } from '@vue/test-utils'
import UnittestTest from '@/components/UnittestTest.vue'
import { describe, test, expect } from 'vitest'

describe('UnittestTest', () => {
  test('renders correctly', () => {
    const wrapper = mount(UnittestTest)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('clicking "add_unittestTest" button calls "openNew" method', async () => {
    const openNewMock = jest.fn()
    const wrapper = mount(UnittestTest, {
      methods: {
        openNew: openNewMock
      }
    })
    await wrapper.find('#add_unittestTest').trigger('click')
    expect(openNewMock).toHaveBeenCalled()
  })

  test('clicking "delete_unittestTest" button calls "confirmDeleteSelected" method', async () => {
    const confirmDeleteSelectedMock = jest.fn()
    const wrapper = mount(UnittestTest, {
      methods: {
        confirmDeleteSelected: confirmDeleteSelectedMock
      }
    })
    await wrapper.find('#delete_unittestTest').trigger('click')
    expect(confirmDeleteSelectedMock).toHaveBeenCalled()
  })

  test('"delete_unittestTest" button is disabled', () => {
    const wrapper = mount(UnittestTest)
    expect(wrapper.find('#delete_unittestTest').element.disabled).toBe(true)
  })
})
*/
import { mount } from 'vue-test-utils'
import { nextTick } from 'vue'
import UnittestTest from '@/components/UnittestTest.vue'
import { describe, test, expect } from 'vitest'


describe('UnittestTest', () => {
  it('renders correctly', () => {
    const wrapper = mount(UnittestTest)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('clicking "add_unittestTest" button calls "openNew" method', async () => {
    const openNewMock = jest.fn()
    const wrapper = mount(UnittestTest, {
      methods: {
        openNew: openNewMock
      }
    })
    await wrapper.find('#add_unittestTest').trigger('click')
    await nextTick()
    expect(openNewMock).toHaveBeenCalled()
  })

  it('clicking "delete_unittestTest" button calls "confirmDeleteSelected" method', async () => {
    const confirmDeleteSelectedMock = jest.fn()
    const wrapper = mount(UnittestTest, {
      methods: {
        confirmDeleteSelected: confirmDeleteSelectedMock
      }
    })
    await wrapper.find('#delete_unittestTest').trigger('click')
    await nextTick()
    expect(confirmDeleteSelectedMock).toHaveBeenCalled()
  })

  it('"delete_unittestTest" button is disabled', () => {
    const wrapper = mount(UnittestTest)
    expect(wrapper.find('#delete_unittestTest').attributes().disabled).toBe('disabled')
  })
})
