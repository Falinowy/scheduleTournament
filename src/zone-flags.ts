/**
 * Prevents Angular change detection from
 * running with certain Web Component callbacks
 */
interface ZoneWindow extends Window {
  __Zone_disable_customElements?: boolean;
}

(window as ZoneWindow).__Zone_disable_customElements = true;
