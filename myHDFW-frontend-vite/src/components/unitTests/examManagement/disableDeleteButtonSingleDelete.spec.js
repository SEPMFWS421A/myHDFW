import {describe, expect, test} from 'vitest';
import delete_exam from "@/components/ExamManagement.vue";
import { mount } from '@vue/test-utils'

describe('Button', () => {
  test('ist deaktiviert', () => {
    const wrapper = mount(delete_exam, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.find('delete_exam').attributes('disabled')).toBeTruthy()
  })
})