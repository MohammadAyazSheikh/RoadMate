import landscapeStyles from './landscapeStyles';
import portraitStyles from './portraitStyles';




export default function responsiveStyles(screenInfo: any, w: number | string, h: number | string, isPortrait: boolean) {

    return isPortrait ? portraitStyles(w, h) : landscapeStyles(w, h)
}

