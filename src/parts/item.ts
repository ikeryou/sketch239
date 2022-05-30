
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Val } from "../libs/val";
import { Expo } from "gsap";

// -----------------------------------------
//
// -----------------------------------------
export class Item extends MyDisplay {

  private _rate:Val = new Val();
  private _isPlaying:boolean = false;
  private _isRollover:boolean = false;
  private _hoverStr:string = '';

  get hoverRate(): number {
    return this._rate.val;
  }

  get hoverStr(): string {
    return this._hoverStr;
  }

  constructor(opt:any) {
    super(opt)

    this._hoverStr = Util.instance.randomArr(['@','%','#','-','¥'])

    this._update();
    this._setHover();
  }


  //
  protected _eRollOver() {
    this._isRollover = true;

    if(this._isPlaying) return;
    this._isPlaying = true;

    Tween.instance.a(this._rate, {
      val:[0, 1]
    }, 0.5, 0, Expo.easeOut, null, null, () => {
      this._eCompRollOver();
    })
  }


  //
  // ------------------------------------
  private _eCompRollOver():void {
    this._isPlaying = false;
    if(!this._isRollover) {
        this._eRollOut();
    }
  }


  //
  protected _eRollOut() {
    this._isRollover = false;

    if(this._isPlaying) return;
    this._isPlaying = true

    Tween.instance.a(this._rate, {
        val:0
    }, 0.75, 0, Expo.easeInOut, null, null, () => {
        this._eCompRollOut()
    })
  }


  //
  // ------------------------------------
  private _eCompRollOut():void {
    this._isPlaying = false
    if(this._isRollover) {
      this._eRollOver()
    }
  }
}