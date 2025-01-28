

// Import each image file from the current directory
import DSC_6522 from "./DSC_6522.JPG";
import DSC_6533 from "./DSC_6533.JPG";
import DSC_6545 from "./DSC_6545.JPG";
import DSC_6565 from "./DSC_6565.JPG";
import DSC_6585 from "./DSC_6585.JPG";
import DSC_6523 from "./DSC_6523.JPG";
import DSC_6534 from "./DSC_6534.JPG";
import DSC_6547 from "./DSC_6547.JPG";
import DSC_6572 from "./DSC_6572.JPG";
import DSC_6586 from "./DSC_6586.JPG";
import DSC_6524 from "./DSC_6524.JPG";
import DSC_6536 from "./DSC_6536.JPG";
import DSC_6549 from "./DSC_6549.JPG";
import DSC_6573 from "./DSC_6573.JPG";
import DSC_6588 from "./DSC_6588.JPG";
import DSC_6525 from "./DSC_6525.JPG";
import DSC_6537 from "./DSC_6537.JPG";
import DSC_6556 from "./DSC_6556.JPG";
import DSC_6578 from "./DSC_6578.JPG";
import DSC_6589 from "./DSC_6589.JPG";
import DSC_6527 from "./DSC_6527.JPG";

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const photos = [
  {
    asset: DSC_6522,
    width: 1080,
    height: 780,
    alt: "Hiking boots",
  },
  {
    asset: DSC_6533,
    width: 1080,
    height: 1620,
    alt: "Purple petaled flowers near a mountain",
  },
  {
    asset: DSC_6545,
    width: 1080,
    height: 720,
    alt: "A person pointing at a beige map",
  },
  {
    asset: DSC_6565,
    width: 1080,
    height: 720,
    alt: "Two hikers walking toward a snow-covered mountain",
  },
  {
    asset: DSC_6585,
    width: 1080,
    height: 1620,
    alt: "A silver and black coffee mug on a brown wooden table",
  },
  {
    asset: DSC_6523,
    width: 1080,
    height: 607,
    alt: "A worm's eye view of trees at night",
  },
  {
    asset: DSC_6534,
    width: 1080,
    height: 608,
    alt: "A pine tree forest near a mountain at sunset",
  },
  {
    asset: DSC_6547,
    width: 1080,
    height: 720,
    alt: "Silhouette photo of three hikers near tall trees",
  },
  {
    asset: DSC_6572,
    width: 1080,
    height: 1549,
    alt: "A person sitting near a bonfire surrounded by trees",
  },
  {
    asset: DSC_6586,
    width: 1080,
    height: 720,
    alt: "Green moss on gray rocks in a river",
  },
  {
    asset: DSC_6524,
    width: 1080,
    height: 694,
    alt: "Landscape photography of mountains",
  },
  {
    asset: DSC_6536,
    width: 1080,
    height: 1620,
    alt: "A pathway between green trees during daytime",
  },
  {
    asset: DSC_6549,
    width: 1080,
    height: 720,
    alt: "A man wearing a black jacket and backpack standing on a grass field during sunset",
  },
  {
    asset: DSC_6573,
    width: 1080,
    height: 1440,
    alt: "Green pine trees under white clouds during the daytime",
  },
  {
    asset: DSC_6588,
    width: 1080,
    height: 1620,
    alt: "A hiker sitting near the cliff",
  },
  {
    asset: DSC_6525,
    width: 1080,
    height: 810,
    alt: "A tall mountain with a waterfall running down its side",
  },
  {
    asset: DSC_6537,
    width: 1080,
    height: 595,
    alt: "Blue mountains",
  },
  {
    asset: DSC_6556,
    width: 1080,
    height: 160,
    alt: "Green trees on a brown mountain under a blue sky during the daytime",
  },
  {
    asset: DSC_6578,
    width: 1080,
    height: 810,
    alt: "A red flower on a green grass field during the daytime",
  },
  {
    asset: DSC_6589,
    width: 1080,
    height: 720,
    alt: "A sign warning people not to disturb nature",
  },
  {
    asset: DSC_6527,
    width: 1080,
    height: 1440,
    alt: "A small creek in Yosemite National Park",
  },
].map(
  ({ asset, alt, width, height }) =>
    ({
      src: asset,
      alt,
      width,
      height,
      srcSet: breakpoints.map((breakpoint) => ({
        src: asset,
        width: breakpoint,
        height: Math.round((height / width) * breakpoint),
      })),
    } )
);

export default photos;
