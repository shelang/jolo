export const redirectModes = [301, 302, 307, 308];

export const linkStatus = Object.freeze({
  Active: 'active',
  DeActive: 'deactive',
});

export const tooltips = Object.freeze({
  destinationUrl:
    'This is the link you want to track: the landing page where you want to send your visitors More info',
  friendlyName:
    'Is the name to identify this tracking link in your reports. Will be only visible to you.',
  redirectMode:
    'You can choose to redirect your customers to different destination URLs depending on different conditions More about redirect mode',
  expirationDate:
    'This type of redirect permits to change the redirection destination after a certain date.',
  note: 'For your reference only. Will only be visible for you.',
  hashUrl:
    'Use this link instead of your destination URL. You can customize it by choosing a domain from the dropdown menu and a name in the text box.',
  forwardParameters:
    'When this option is enabled, all the parameters present in the tracking link (the text after the question mark "?") will be passed to the destination URL.',
});
