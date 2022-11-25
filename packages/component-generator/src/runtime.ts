import { DefineComponent } from "vue/types/v3-define-component";

export type GlobalComponent<Props = {}, Slots = {}> = DefineComponent<Props, { $scopedSlots: Slots }>;
export type Slotted<T extends object | undefined = undefined> = (_: T) => any;

declare module "vue" {
  interface GlobalComponents {
    /**
     * This component is used only in layouts to display the page components.
     * @see - https://nuxtjs.org/api/components-nuxt
     */
    Nuxt: GlobalComponent<NuxtProps, {}>;
    /**
     * This component is used for displaying the children components in a nested route.
     * @see - https://nuxtjs.org/api/components-nuxt-child
     */
    NuxtChild: GlobalComponent<NuxtChildProps, {}>;
    /**
     * This component is used for displaying the children components in a nested route.
     * @see - https://nuxtjs.org/api/components-nuxt-child
     */
    NChild: GlobalComponent<NuxtChildProps, {}>;
    /**
     * This component is used to provide navigations between page components and enhance performances with smart prefetching.
     * @see - https://nuxtjs.org/api/components-nuxt-link
     */
    NuxtLink: GlobalComponent<NuxtLinkProps, NuxtLinkSlots>;
    /**
     * This component is used to provide navigations between page components and enhance performances with smart prefetching.
     * @see - https://nuxtjs.org/api/components-nuxt-link
     */
    NLink: GlobalComponent<NuxtLinkProps, NuxtLinkSlots>;
  }

  export interface NuxtLinkSlots {
    default: Slotted<{
      /**
       * Resolved url. This would be the `href` attribute of an `a` element
       */
      href: string;
      /**
       * Resolved normalized location
       */
      route: object;
      /**
       * Function to trigger the navigation. **It will automatically prevent events when necessary**, the same way `router-link` does
       */
      navigate: () => any;
      /**
       * `true` if the active class should be applied. Allows to apply an arbitrary class
       */
      isActive: boolean;
      /**
       * `true` if the exact active class should be applied. Allows to apply an arbitrary class
       */
      isExactActive: boolean;
    }>;
  }

  export interface NuxtLinkProps {
    /**
     * Disable prefetching on the link
     * @see - https://nuxtjs.org/docs/features/nuxt-components/#disable-prefetching-for-specific-links
     */
    "no-prefetch"?: boolean;
    /**
     * Enable / Disabled Smart prefetching.
     * @see - https://nuxtjs.org/docs/features/nuxt-components/#prefetchlinks
     * @default - true
     */
    prefetch?: boolean;
    "prefetched-class"?: string;
    /**
     * Denotes the target route of the link. When clicked, the value of the `to` prop will be passed to `router.push()` internally, so the value can be either a string or a location descriptor object.
     * @see - https://router.vuejs.org/api/#to
     */
    to: string | object;
    /**
     * Sometimes we want `<router-link>` to render as another tag, e.g `<li>`. Then we can use `tag` prop to specify which tag to render to, and it will still listen to click events for navigation.
     * @see - https://router.vuejs.org/api/#tag
     * @default - 'a'
     */
    tag?: string;
    /**
     * The default active class matching behavior is **inclusive match**. For example, `<router-link to=\"/a\">` will get this class applied as long as the current path starts with `/a/` or is `/a`.\n\nOne consequence of this is that `<router-link to=\"/\">` will be active for every route! To force the link into \"exact match mode\", use the `exact` prop
     * @see - https://router.vuejs.org/api/#exact
     * @default - false
     */
    exact?: boolean;
    /**
     * Setting `append` prop always appends the relative path to the current path.
     * @see - https://router.vuejs.org/api/#append
     * @default - false
     */
    append?: boolean;
    /**
     * Setting `replace` prop will call `router.replace()` instead of `router.push()` when clicked, so the navigation will not leave a history record.
     * @see - https://router.vuejs.org/api/#replace
     * @default - false
     */
    replace?: boolean;
    /**
     * Configure the active CSS class applied when the link is active. Note the default value can also be configured globally via the `linkActiveClass` router constructor option.
     * @see - https://router.vuejs.org/api/#active-class
     * @default - 'router-link-active'
     */
    activeClass?: string;
    /**
     * Configure the active CSS class applied when the link is active with exact match. Note the default value can also be configured globally via the `linkExactActiveClass` router constructor option.
     * @see - https://router.vuejs.org/api/#exact-active-class
     * @default - 'router-link-exact-active'
     */
    exactActiveClass?: string;
    /**
     * Configure the value of `aria-current` when the link is active with exact match. It must be one of the allowed values for aria-current in the ARIA spec. In most cases, the default of `page` should be the best fit.
     * @see - https://router.vuejs.org/api/#aria-current-value
     * @default - 'page'
     */
    ariaCurrentValue?: string;
    /**
     * Specify the event(s) that can trigger the link navigation.
     * @see - https://router.vuejs.org/api/#event
     * @default - 'click'
     */
    event?: string | string[];
  }

  export interface NuxtChildProps {
    /**
     * This prop will be set to `<router-view/>`, useful to make transitions inside a dynamic page and different route.
     * @default $route.path
     */
    "nuxt-child-key"?: string;
    /**
     * This prop will be set to `<router-view/>`, used to render named-view of page component.
     */
    name?: string;
    /**
     * @see - https://nuxtjs.org/docs/features/nuxt-components#keep-alive
     * @see - https://vuejs.org/api/built-in-components.html#keepalive
     */
    "keep-alive"?: boolean;
    /**
     * @see - https://nuxtjs.org/docs/features/nuxt-components#keep-alive
     * @see - https://vuejs.org/api/built-in-components.html#keepalive
     */
    "keep-alive-props"?: object;
  }

  export interface NuxtProps {
    /**
     * This prop will be set to `<router-view/>`, useful to make transitions inside a dynamic page and different route.
     * @default $route.path
     */
    "nuxt-child-key"?: string;
    /**
     *This prop will be set to `<router-view/>`, used to render `named-view` of page component.
     * @default default
     */
    name?: string;
    /**
     * @see - https://nuxtjs.org/docs/features/nuxt-components#keep-alive
     * @see - https://vuejs.org/api/built-in-components.html#keepalive
     */
    "keep-alive"?: boolean;
    /**
     * @see - https://nuxtjs.org/docs/features/nuxt-components#keep-alive
     * @see - https://vuejs.org/api/built-in-components.html#keepalive
     */
    "keep-alive-props"?: object;
  }
}

export {};
