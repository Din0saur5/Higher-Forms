html to convert:
<div class="wrap">
  <div class="wallet" id="wallet">
    <div class="icon">
      <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="24" height="24" viewBox="0 0 458.5 458.5" fill="currentColor"><path d="M336.7 344c-22 0-39.9-18-39.9-39.9V238c0-22 18-39.8 39.9-39.8h105.7v-65.9c0-17-13.8-30.7-30.7-30.7h-381c-17 0-30.7 13.7-30.7 30.7v277.6c0 17 13.8 30.8 30.7 30.8h381c17 0 30.7-13.8 30.7-30.8V344H336.7z"/><path d="M440.5 220H336.7c-10 0-18 8-18 18V304c0 10 8 18 18 18h103.8c10 0 18-8 18-18V238c0-10-8-18-18-18zm-68 77a26 26 0 1 1 0-52 26 26 0 0 1 0 52zM358.2 45.2A39.7 39.7 0 0 0 308 20L152 71.6h214.9l-8.7-26.4z"/></svg>
    </div>
    <div
      class="coin coin--animated"
      style="--coin-to-x: calc(-100px + 400px); --coin-to-y: calc(-105px + 24px); --coin-delay: 0.3s;"
    ></div>
    <div
      class="coin coin--animated"
      style="--coin-to-x: calc(-70px + 400px); --coin-to-y: -90px; --coin-delay: 0.1s;"
    ></div>
    <div
      class="coin coin--animated"
      style="--coin-to-x: calc(-30px + 400px); --coin-to-y: -125px; --coin-delay: 0s;"
    ></div>
    <div
      class="coin coin--animated"
      style="--coin-to-x: calc(10px + 400px); --coin-to-y: -130px; --coin-delay: 0.2s;"
    ></div>
    <div
      class="coin coin--animated"
      style="--coin-to-x: calc(30px + 400px); --coin-to-y: -100px; --coin-delay: 0.1s;"
    ></div>
    <div
      class="coin coin--animated"
      style="--coin-to-x: calc(70px + 400px); --coin-to-y: -95px; --coin-delay: 0.4s;"
    ></div>
    <div
      class="coin coin--animated"
      style="--coin-to-x: calc(100px + 300px); --coin-to-y: -100px; --coin-delay: 0.2s;"
    ></div>
  </div>
</div>



css:

* {
    padding: 0;
    margin: 0;
  }
  
  .wrap {
    width: 100vw;
    height: 100vh;
    padding-top: calc(75vh - 64px);
    display: flex;
    justify-content: center;
    background: #131313;
  }
  
  .wallet {
    width: 64px;
    height: 64px;
    position: relative;
  }
  
  .icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #0066ff;
    color: #fff;
    position: relative;
    z-index: 101;
  }
  
  .coin {
    position: absolute;
    top: var(--coin-from-x, 24px);
    left: var(--coin-from-y, 24px);
    z-index: 100;
    opacity: 0;
  }
  
  .coin::after {
    content: "$";
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12px;
    height: 12px;
    font-size: 10px;
    color: rgb(237, 196, 107);
    background: rgb(227, 162, 23);
    border: 2px solid rgb(237, 196, 107);
    border-radius: 50%;
    opacity: 0;
  }
  
  .coin--animated,
  .coin--animated::after {
    animation-delay: var(--coin-delay, 0s);
    animation-duration: var(--coin-duration, 1.5s);
    animation-direction: normal;
    animation-fill-mode: both;
    animation-play-state: running;
    animation-iteration-count: infinite;
  }
  
  .coin--animated {
    animation-name: coin-x-axis;
    animation-timing-function: ease-in;
  }
  
  .coin--animated::after {
    animation-name: coin-y-axis-and-flip;
    animation-timing-function: ease-out;
  }
  
  @keyframes coin-x-axis {
    30% {
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    to {
      left: calc(var(--coin-to-x) * 1);
    }
  }
  
  @keyframes coin-y-axis-and-flip {
    20% {
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    to {
      transform: translateY(calc(var(--coin-to-y) * 5)) rotate3d(1, 1, 1, 1080deg);
    }
  }
  