// Photos per section, in display order. Only 'id' and 'secret' (from the Flickr
// download URL) are needed. Pages pick a set via <body data-set="fieldnotes|people">.
const PHOTO_SETS = {
  fieldnotes: [
    { id: '55629504832', secret: 'd808d60769' },
    { id: '55334239853', secret: 'e3ab5299a3' },
    { id: '55228125695', secret: 'fc9584b97e' },
    { id: '55334504465', secret: '8c7f95e4d8' },
    { id: '55228197107', secret: 'c5474e2268' },
    { id: '55147933695', secret: '9e5f83597d' },
    { id: '55230230648', secret: 'e4d5a210b1' },
    { id: '55229508815', secret: '0c69dd0056' },
    { id: '55229110742', secret: 'b7aa3f8f7e' },
    { id: '55229137027', secret: 'b4a4dd5290' },
    { id: '55333154337', secret: 'c9aff5909e' },
    { id: '55230236628', secret: '5c464bc529' },
    { id: '55229163892', secret: '577a6bd1ac' },
    { id: '55259923177', secret: '908931ac74' },
    { id: '55261055639', secret: 'cb9c5141aa' },
    { id: '55230488095', secret: '0b5fb76836' },
    { id: '55230488340', secret: 'ec011a06c4' },
    { id: '55261219350', secret: 'fa858b2cec' },
  ],
  people: [
    { id: '55382215404', secret: 'ccba035798' },
    { id: '55230367874', secret: '0d6ee50f78' },
    { id: '55230276268', secret: 'f15799716f' },
    { id: '55311778063', secret: '66f73818fd' },
    { id: '55229210742', secret: 'c27e619da6' },
    { id: '55230529675', secret: 'a89087a31d' },
    { id: '55259849917', secret: '9ffefed11b' },
    { id: '55230366679', secret: '8f66e46b07' },
  ],
};
