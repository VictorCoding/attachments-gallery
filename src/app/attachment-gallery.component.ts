import { ViewChild, Component, Input, HostListener } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
@Component({
  selector: "attachment-gallery",
  animations: [
    trigger("flyInOut", [
      state("in", style({ transform: "translateX(0)" })),
      transition("void => *", [
        style({ transform: "translateX(-100%)" }),
        animate(1000)
      ]),
      transition("* => void", [
        animate(1000, style({ transform: "translateX(100%)" }))
      ])
    ])
  ],
  styles: [
    `
      * {
        box-sizing: border-box;
      }
      .slideshow-container {
        position: relative;
        min-width: 200pt;
        border: 1px solid black;
        border-radius: 5pt;
      }
      .slide {
        display: none;
        justify-content: center;
        min-height: 220pt;
        align-items: center;
        border-bottom: 1px solid black;
      }
      .slide.show {
        display: flex;
      }
      .slide img {
        width: 100%;
        height: 100%;
        max-width: 120pt;
      }
      .cursor {
        cursor: pointer;
      }
      .prev,
      .next {
        cursor: pointer;
        position: absolute;
        top: 40%;
        width: auto;
        padding: 16px;
        margin-top: -50px;
        color: black;
        font-weight: bold;
        font-size: 20px;
        border-radius: 0 3px 3px 0;
        user-select: none;
        -webkit-user-select: none;
      }
      .next {
        right: 0;
        border-radius: 3px 0 0 3px;
      }
      .prev:hover,
      .next:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
      .caption-container {
        text-align: center;
        padding: 2px 16px;
        color: white;
        width: 100%;
        height: 28pt;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid black;
      }
      .caption-container p {
        color: black;
        background: #d2d1d4;
        width: 37%;
        border-radius: 8pt;
      }
      .file-select-container {
        width: 100%;
        position: relative;
        height: 50pt;
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
        border-bottom: 1px solid black;
      }
      .file-select-container p {
        position: absolute;
        top: 25px;
        margin: 0;
        width: 100%;
        text-align: center;
      }
      .file-select-container input {
        opacity: 0;
      }
      .row {
        display: flex;
        width: 100%;
        overflow-x: auto;
        justify-content: space-around;
      }
      .column {
        height: 40pt;
      }
      .demo {
        opacity: 0.6;
        height: 100%;
      }
      .active,
      .demo:hover {
        opacity: 1;
      }
    `
  ],
  template: `
    <div class="slideshow-container">
      <!-- full width images -->
      <div
        [@flyInOut]="state"
        class="slide"
        *ngFor="let img of images; let i = index"
        [ngClass]="{ show: slideIndex === i }"
      >
        <img [src]="img.url" />
        <!-- next/prev buttons -->
      </div>
      <a class="prev" (click)="plusSlides(-1)">&#10094;</a>
      <a class="next" (click)="plusSlides(1)">&#10095;</a>

      <!-- caption text -->
      <div class="caption-container">
        <p id="caption">{{ captionText }}</p>
      </div>

      <!-- select file -->

      <div class="file-select-container">
        <p>
          Drag or click here to upload attachments
        </p>
        <input
          #fileInput
          class="file-input"
          (change)="loadAttachment()"
          type="file"
          title=""
        />
      </div>

      <!-- thumbnail images -->
      <div class="row">
        <div class="column" *ngFor="let img of images; let i = index">
          <img class="demo cursor" [src]="img.url" (click)="currentSlide(i)" />
        </div>
      </div>
    </div>
  `
})
export class AttachmentGalleryComponent {
  @Input("attachments")
  images = [];
  slideIndex = 0;
  captionText = "";
  isDragging = false;
  @ViewChild("fileInput")
  fileInput;
  state = "in";

  @HostListener("drop", ["$event"])
  onDrop(e: any) {
    this.cancel(e);
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.images.push({
        url: reader.result,
        captionText: file.name
      });
    };
    reader.readAsDataURL(e.dataTransfer.files[0]);
  }

  @HostListener("drag", ["$event"])
  onDrag(e: Event) {
    this.cancel(e);
  }
  @HostListener("dragstart", ["$event"])
  onDragStart(e: Event) {
    this.cancel(e);
  }
  @HostListener("dragend", ["$event"])
  onDragEnd(e: Event) {
    this.cancel(e);
  }
  @HostListener("dragover", ["$event"])
  onDragOver(e: Event) {
    this.cancel(e);
  }
  @HostListener("dragenter", ["$event"])
  onDragEnter(e: Event) {
    this.cancel(e);
  }
  @HostListener("dragleave", ["$event"])
  onDragLeave(e: Event) {
    this.cancel(e);
  }

  cancel(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  ngOnInit() {
    this.showSlides(this.slideIndex);
  }

  plusSlides(direction: number) {
    this.showSlides((this.slideIndex += direction));
  }

  // Thumbnail image controls
  currentSlide(n) {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n) {
    const slides = this.images.length;

    if (n === slides) {
      this.slideIndex = 0;
    }
    if (n < slides && n !== -1) {
      this.slideIndex = n;
    }
    if (n === -1) {
      this.slideIndex = slides - 1;
    }

    console.log(this.slideIndex, slides, n);

    this.captionText = this.images[this.slideIndex].captionText;
  }

  loadAttachment() {
    const file = this.fileInput.nativeElement.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.images.push({
        url: reader.result,
        captionText: file.name
      });
    };
    reader.readAsDataURL(file);
  }
}
