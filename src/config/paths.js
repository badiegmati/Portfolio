const isProduction = process.env.NODE_ENV === 'production';

export const BASE_PATH = isProduction ? '/Portfolio' : '';

export const ASSETS = {
  IMAGES: {
    JAVA: `${BASE_PATH}/src/assets/images/java.png`,
    PYTHON: `${BASE_PATH}/src/assets/images/python.png`,
    CPP: `${BASE_PATH}/src/assets/images/c-.png`,
    FLUTTER: `${BASE_PATH}/src/assets/images/flutter.png`,
    FIGMA: `${BASE_PATH}/src/assets/images/figma.png`,
    VSCODE: `${BASE_PATH}/src/assets/images/vscode.png`,
    LINUX: `${BASE_PATH}/src/assets/images/linux.png`,
    IOT: `${BASE_PATH}/src/assets/images/iot.png`,
    CV: `${BASE_PATH}/src/assets/images/CV-Badie-Gmati.pdf`
  }
};

// Utilisation :
// <img src={ASSETS.IMAGES.JAVA} alt="Java" />