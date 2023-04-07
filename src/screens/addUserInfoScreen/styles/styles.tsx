import landscapeStyles from './landscapeStyles';
import portraitStyles from './portraitStyles';


type p = (number: number) => number;

export default function responsiveStyles(screenInfo: any, w: p, h: p, isPortrait: boolean) {

    return isPortrait ? portraitStyles(w, h) : landscapeStyles(w, h)
}

