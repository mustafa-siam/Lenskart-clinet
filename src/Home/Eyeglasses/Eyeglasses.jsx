import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Categoryslider from '../../Hooks/Categoryslider';
import Brandsection from '../../Hooks/Brandsection';

const Eyeglasses = () => {
  const eyeglasses = [
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-black-full-rim-geometric-vincent-chase-sleek-steel-vc-e13786-c2-eyeglasses_ccg_3318.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/blue-silver-full-rim-square-vincent-chase-sleek-steel-vc-e16002-c2-eyeglasses_g_3149_09_21_23.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/Transparent-Blue-Full-Rim-Rectangle-Vincent-Chase-Classic-Acetate-VC-E13676-C3-Eyeglasses_vincent-chase-vc-e13676-c3-c3-eyeglasses_G_924107_02_2022.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/gold-full-rim-geometric-vincent-chase-sleek-steel-vc-e13785-c1-eyeglasses_gm_5964.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//l/i/black-full-rim-square-lenskart-air-fusion-la-e13069-c1-eyeglasses_lenskart-air-la-e13033-c1-eyeglasses_eyeglasses_g_7875_1b_28july23.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//l/i/black-full-rim-square-lenskart-air-fusion-la-e13069-c1-eyeglasses_lenskart-air-la-e13033-c1-eyeglasses_eyeglasses_g_7875_1b_28july23.jpg",
  ];
  const sunglasses=[
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/black-grey-full-rim-wayfarer-vincent-chase-polarized-athleisure-vc-s14459-c7-sunglasses_g_2628_9_29_22.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/gunmetal-blue-full-rim-round-vincent-chase-the-metal-edit-vc-s13137-c3-sunglasses_vincent-chase-vc-s13137-c3-c3-sunglasses_sunglasses_g_8708_5july23.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/Gold-Black-Grey-Gradient-Full-Rim-Square-Vincent-Chase-Polarized-VINTAGE-VC-S11748-C4-Polarized-Sunglasses_vincent-chase-vc-s11748-c4-sunglasses_sunglasses_G_126118_02_2022.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/gold-grey-full-rim-round-vincent-chase-polarized-the-metal-edit-vc-s13112-c4-polarized-sunglasses_vincent-chase-vc-s13112-c4-sunglasses_sunglasses_j_3396_1_1_5july23.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//l/i/black-brown-full-rim-square-lenskart-studio-lenskart-hustlr-vc-s15999-c1-sunglasses_g_7305_09_26_23.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/transparent-green-grey-full-rim-wayfarer-vincent-chase-polarized-athleisure-vc-s14459-c6-sunglasses_g_2600_9_29_22.jpg",
  ]
  const powerglasses=[
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-air-lae000061-c1-eyeglasses__dsc1649.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/Matte-Black-Full-Rim-Rectangle-Lenskart-Air-Flex-LA-E13776-C1-Eyeglasses_lenskart-air-la-e13776-c1-eyeglasses_g_5348_107_02_2022.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//v/i/copper-brown-copper-tortoise-full-rim-rectangle-vincent-chase-sleek-steel-vc-e13757-c3-eyeglasses_g_871124_02_2022.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-e15346-c6-eyeglasses_dsc0527_28_04_2025.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//l/i/black-full-rim-square-lenskart-air-fusion-la-e13069-c1-eyeglasses_lenskart-air-la-e13033-c1-eyeglasses_eyeglasses_g_7876_2a_28july23.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//j/i/john-jacobs-jj-e16683-c2-eyeglasses_img_7195_07_03_2024.jpg",
  ]
  const kidsglassess=[
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/blue-transparent-black-grey-full-rim-rectangle-kids--8-12-yrs--hooper-flexi-hooper-hp-e15084l-c3-eyeglasses_blue-transparent-black-grey-full-rim-rectangle-kids-(8-12-yrs)-hooper-flexi-hooper-hp-e15084l-c3-eyeglasses_g_5351_9_21_22_22_march23.jpg.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/black-pink-full-rim-rectangle-hooper-space-explorers-kids-teens-hp-e10004xl-eyeglasses__dsc2687_21_03_2025.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses:-black-sky-blue-black-full-rimrectangle-kids-5-8-yrs-hooper-tr-essentials-hp-e10014m-c6-eyeglasses__dsc5755_15_10_2024.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses:-matte-black-green-black-full-rim-rectangle-kids-5-8-yrs-hooper-tr-flex-hp-e15085l-c7-eyeglasses_dsc3481_01_10_2024.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses:-blue-purple-full-rim-cat-eye-kids--5-8-yrs--hooper-flexi-hooper-hp-e10084-c2_hooper-hp-e10084-c2-eyeglasses_g_5475_22_march23.jpg.jpg",
    "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses:-matte-purple-full-rim-rectangle-kids-5-8-yrs-hooper-tr-flex-hp-e15085m-c5-eyeglasses_dsc3544_01_10_2024.jpg",
  ]
  return (
    <div className="space-y-12">
        <Categoryslider className="max-w-6xl mx-auto" heading={"EYEGLASSES"} data={eyeglasses}>
 </Categoryslider>
 <Brandsection img={"https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/VC-Banner.jpg"}></Brandsection>
        <Categoryslider className="max-w-6xl mx-auto" heading={"SUNGLASSES"} data={sunglasses}>
 </Categoryslider>
 <Brandsection img={"https://static1.lenskart.com/media/desktop/img/Nov22/Updated%20brand%20banner%20jj%20.jpg"}></Brandsection>
        <Categoryslider className="max-w-6xl mx-auto" heading={"POWERGLASSES"} data={powerglasses}>
 </Categoryslider>
 <Brandsection img={"https://static1.lenskart.com/media/desktop/img/Aug21/25-Aug/LK-Readers-Banner.jpg"}></Brandsection>
        <Categoryslider className="max-w-6xl mx-auto" heading={"KIDSGLASSES"} data={kidsglassess}>
 </Categoryslider>
 <Brandsection img={"http://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/Banner05_Final2ndDec21.jpg"}></Brandsection>
  
    </div>

  );
};

export default Eyeglasses;
