import { MyDisplay } from "../core/myDisplay";
import { Util } from "../libs/util";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _text:HTMLTextAreaElement;
  private _item:Array<Item> = [];

  constructor(opt:any) {
    super(opt)

    // テキストエリア
    this._text = document.createElement('textarea');
    document.body.append(this._text);
    this._text.rows = 2;
    this._text.cols = 20;

    const num = 6;
    for(let i = 0; i < num; i++) {
      const el = document.createElement('div')
      el.classList.add('item')
      this.getEl().append(el)
      const item = new Item({
        id:i,
        el:el,
      })
      this._item.push(item);
    }

    this._resize();
  }


  protected _update(): void {
    super._update();

    let txt = '';
    const menuName:Array<string> = ['About', 'Service', 'Work', 'Company', 'Join', 'Contact']

    this._item.forEach((val,l) => {
      const name = menuName[l]
      txt += name + '\n';
      const rate = val.hoverRate;
      const num = ~~(Util.instance.map(rate, 0, name.length, 0, 0.8));
      for(let i = 0; i < num; i++) {
        txt += val.hoverStr;
      }
      txt += '\n\n';
    });
    this._text.value = txt;
  }
}