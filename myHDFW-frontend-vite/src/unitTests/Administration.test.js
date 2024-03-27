import { mount } from "@vue/test-utils"
import {test, expect} from "vitest";
import Administration from "@/components/Administration.vue";

test ("mount component", async () => {
    expect(Administration).toBeTruthy();

    const wrapper = mount (Administration,{
        props: {
            isVisible: true,
            msg: "Es besteht ein Inhalt"
        },
    });

    expect(wrapper.text()).toContain("Es besteht ein Inhalt");
});
