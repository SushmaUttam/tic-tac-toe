import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares : string[];
  xIsNext: boolean;
  winner: string;

  private ctx : AudioContext;
  constructor() { }

  ngOnInit(): void {
    this.newGame();
    AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AudioContext();
  }

  play(){
    // let osc = this.ctx.createOscillator();
    // osc.onended = () => osc.disconnect();
    // osc.connect(this.ctx.destination);
    // osc.start();
    // osc.stop(this.ctx.currentTime + 0.5);
    //let audio: HTMLAudioElement = new Audio('https://drive.google.com/uc?export=download&id=1M95VOpto1cQ4FQHzNBaLf0WFQglrtWi7');
    let audio: HTMLAudioElement = new Audio("../../assets/toast_sound.mp3");
    audio.play();
  }

  newGame(){
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player(){
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number){
    if(!this.squares[idx]){
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.winner= this.calculateWinner();
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}