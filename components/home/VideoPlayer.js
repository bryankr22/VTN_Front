import { createRef, useEffect } from "react";
import {
  applyPolyfills,
  defineCustomElements,
} from "@deckdeckgo/youtube/dist/loader";

applyPolyfills().then(() => {
  defineCustomElements(window);
});

export default function VideoPlayer({ link }) {
  const container = createRef();

  const videoObserver = new IntersectionObserver(onVideoIntersection, {
    rootMargin: "100px 0px",
    threshold: 0.25,
  });

  useEffect(() => {
    if (window && "IntersectionObserver" in window) {
      if (container && container.current) {
        videoObserver.observe(container.current);
      }
    } else {
      loadVideo();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);

  function onVideoIntersection(entries) {
    if (!entries || entries.length <= 0) {
      return;
    }

    if (entries[0].isIntersecting) {
      loadVideo();
      videoObserver.disconnect();
    }
  }

  async function loadVideo() {
    if (container && container.current) {
      container.current?.lazyLoadContent?.();
      setTimeout(() => {
        const element = document.querySelector('deckgo-youtube').shadowRoot.querySelector('iframe')
        element.width='100%'
        element.height= '500px'
      }, 100)
    }
  }

  return (
    <>
      <deckgo-youtube
        ref={container}
        src={link}
      ></deckgo-youtube>
    </>
  );
}
