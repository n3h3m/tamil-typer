'use babel';

import TamilTyperView from './tamil-typer-view';
import { CompositeDisposable } from 'atom';

export default {

  tamilTyperView: null,
  modalPanel: null,
  subscriptions: null,
  enabled: false,

  activate(state) {
    this.tamilTyperView = new TamilTyperView(state.tamilTyperViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.tamilTyperView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tamil-typer:toggle': () => this.toggle()
    }));
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'tamil-typer:enable': () => this.enable()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.tamilTyperView.destroy();
  },

  serialize() {
    return {
      tamilTyperViewState: this.tamilTyperView.serialize()
    };
  },

  enable() {
    debugger;
    if(this.enabled){
      this.enabled=false;
      return
    }
    this.enabled=true;
  },

  engtotam(text){
    //Conversions should happen by the longest strings at first, Otherwise unexpected bugs will arise
    text = ' '+text;
    text = text.replace(/ng/g, "ங்க~");
    text = text.replace(/nj/g, "ஞ்ச~");
    text = text.replace(/nt/g, "ண்ட~");
    text = text.replace(/nd/g, "ந்த~");
    text = text.replace(/mb/g, "ம்ப~");
    text = text.replace(/nr/g, "ன்ற~");


    text = text.replace(/ n/g, " ந~");
    text = text.replace(/tr/g, "ற்ற~");
    text = text.replace(/sk/g, "ஸ்க~");
    text = text.replace(/st/g, "ஸ்ட~");
    text = text.replace(/sd/g, "ஸ்த~");
    text = text.replace(/sp/g, "ஸ்ப~");
    text = text.replace(/sr/g, "ஸ்ற~");

    text = text.replace(/k/g, "க~");
    text = text.replace(/s/g, "ச~");
    text = text.replace(/t/g, "ட~");
    text = text.replace(/d/g, "த~");
    text = text.replace(/p/g, "ப~");
    text = text.replace(/w/g, "ற~");
    text = text.replace(/g/g, "ங~");
    text = text.replace(/x/g, "ஞ~");
    text = text.replace(/b/g, "ண~");
    text = text.replace(/q/g, "ந~");
    text = text.replace(/m/g, "ம~");
    text = text.replace(/n/g, "ன~");
    text = text.replace(/y/g, "ய~");
    text = text.replace(/r/g, "ர~");
    text = text.replace(/l/g, "ல~");
    text = text.replace(/f/g, "ள~");
    text = text.replace(/v/g, "வ~");
    text = text.replace(/z/g, "ழ~");
    text = text.replace(/j/g, "ஜ~");
    text = text.replace(/h/g, "ஹ~");
    text = text.replace(/S/g, "ஸ~");
    text = text.replace(/c/g, "ஷ~");

    text = text.replace(/~aa/g, "ா");
    text = text.replace(/~ii/g, "ீ");
    text = text.replace(/~uu/g, "ூ");
    text = text.replace(/~ee/g, "ே");
    text = text.replace(/~oo/g, "ோ");
    text = text.replace(/~ai/g, "ை");
    text = text.replace(/~au/g, "ௌ");
    text = text.replace(/~a/g, "");
    text = text.replace(/~i/g, "ி");
    text = text.replace(/~u/g, "ு");
    text = text.replace(/~e/g, "ெ");
    text = text.replace(/~o/g, "ொ");
    text = text.replace(/~/g, "்");

    text = text.replace(/aa/g, "ஆ");
    text = text.replace(/ii/g, "ஈ");
    text = text.replace(/uu/g, "ஊ");
    text = text.replace(/ee/g, "ஏ");
    text = text.replace(/oo/g, "ஓ");
    text = text.replace(/ai/g, "ஐ");
    text = text.replace(/au/g, "ஔ");
    text = text.replace(/a/g, "அ");
    text = text.replace(/i/g, "இ");
    text = text.replace(/u/g, "உ");
    text = text.replace(/e/g, "எ");
    text = text.replace(/o/g, "ஒ");
    text = text.replace(/Q/g, "ஃ");
    return text.trim();
  },

  toggle() {
    if (this.enabled==true){
      let editor
      if (editor = atom.workspace.getActiveTextEditor()) {

        editor.selectWordsContainingCursors()
        let selection = editor.getSelectedText()
        let trail = ''
        if(selection==='.'||selection===','||selection==='?'){
          trail = selection
          editor.moveLeft(1)
          editor.selectWordsContainingCursors()
          selection = editor.getSelectedText()
        }
        let tam = this.engtotam(selection)
        if(trail){
          editor.insertText(tam)
          editor.moveRight(1)
          editor.insertText(' ')
        }
        else{
          editor.insertText(tam+' ')
        }
      }
    }else{
      let editor
      if (editor = atom.workspace.getActiveTextEditor()) {
        editor.insertText(' ')
      }
    }
  }
  // Original toggle method the time of packag creation.
  // toggle() {
  //   console.log('TamilTyper was toggled!');
  //   return ( this.modalPanel.isVisible() ? this.modalPanel.hide() : this.modalPanel.show() );
  // }
};
