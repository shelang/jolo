export const redirectModes = [301, 302, 307, 308];

export const linkStatus = Object.freeze({
  Active: "ACTIVE",
  DeActive: "INACTIVE",
});

export const os = ["Android", "iOS"];

export const devices = ["Moblie", "Desktop"];

export const tooltips = Object.freeze({
  destinationUrl:
    "This is the link you want to track: the landing page where you want to send your visitors More info",
  friendlyName:
    "Is the name to identify this tracking link in your reports. Will be only visible to you.",
  redirectMode:
    "You can choose to redirect your customers to different destination URLs depending on different conditions More about redirect mode",
  expirationDate:
    "This type of redirect permits to change the redirection destination after a certain date.",
  note: "For your reference only. Will only be visible for you.",
  hashUrl:
    "Use this link instead of your destination URL. You can customize it by choosing a domain from the dropdown menu and a name in the text box.",
  forwardParameters:
    'When this option is enabled, all the parameters present in the tracking link (the text after the question mark "?") will be passed to the destination URL.',
  textTargeting:
    "Device filter has higher priority than OS, For example, if you write google.com for mobile devices and then write bing.com for android users, Linkcomposer redirects the user to the google.com",
});

export const booleanEnum = Object.freeze({
  true: true,
  false: false,
});

export const timeframes = Object.freeze({
  0: "Today",
  1: "Yesterday",
  7: "Last 7 days",
  30: "Last 30 days",
  90: "Last 90 days",
  180: "Last 180 days",
  365: "Last 12 months",
  current: "Current month",
  prev: "Previous month",
  prevYear: "Previous year",
  beginning: "From the beginning",
  custom: "Custom time frame",
});
