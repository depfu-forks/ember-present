import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['currentSlide'],

  actions: {
    next() {
      this._invokeAllSlideServices('next');
    },
    previous() {
      this._invokeAllSlideServices('previous');
    }
  },

  _invokeAllSlideServices(functionName) {
    let iframes = document.getElementsByTagName("iframe");

    for (let i=0; i<iframes.length; i++) {
      let iframe = iframes[i];
      let container = iframe.contentWindow.Dummy.__container__;

      let slidesService = container.lookup('service:slides-service');

      slidesService[functionName]();

      if (i === 0) {
        this.set('currentSlide', slidesService.get('current.name'));
      }
    }
  }
});
