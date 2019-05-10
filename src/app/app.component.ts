import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  styles: [
    `
    
  `
  ],
  template: `
    <attachment-gallery [attachments]="attachments">
    </attachment-gallery>
  `
})
export class AppComponent {
  attachments = [
    {
      url:
      "https://ih0.redbubble.net/image.147730588.7244/flat,800x800,070,f.jpg",
      captionText: "falco"
    },
    {
      url:
        "https://www.ssbwiki.com/images/thumb/e/ee/Fox_SSBB.jpg/250px-Fox_SSBB.jpg",
      captionText: "fox"
    },
    {
      url:
        "https://www.ssbwiki.com/images/thumb/7/79/Marth_SSB4.png/250px-Marth_SSB4.png",
      captionText: "marth"
    }
  ];
}
