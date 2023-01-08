<template>
  <div class="wrapper">
    <header class="header">
      <div class="header-container">
        <div class="header-top">
          <img src="./images/logo.png" class="header-top-logo" />
          <ul class="header-top-menu">
            <li class="header-top-menu-item">
              <a href="#!" class="header-top-menu-link">Home</a>
            </li>
            <li class="header-top-menu-item">
              <a href="#!" class="header-top-menu-link">Careers</a>
            </li>
            <li class="header-top-menu-item">
              <a href="#!" class="header-top-menu-link">Blog</a>
            </li>
            <li class="header-top-menu-item">
              <a href="#!" class="header-top-menu-link">About</a>
            </li>
          </ul>
          <div class="header-top-btn">
            <button class="header-top-btn_click btn--default">Login</button>
            <button class="header-top-btn_click btn--orange">Sign Up</button>
          </div>
        </div>
        <div class="header-main">
          <div class="header-content">
            <h1 class="header-heading">
              Studying <span>Online is now much easier</span>
            </h1>
            <p class="header-desc">
              Skilline is an interesting platform that will teach you in more an
              interactive way
            </p>
            <div class="header-actions">
              <a href="#!" class="btn btn--primary">Join for free</a>
              <a href="#!" class="watch">
                <div class="watch-icon">
                  <img src="./images/icon-play.svg" alt="" />
                </div>
                <span>Watch how it works</span>
              </a>
            </div>
          </div>
          <div class="header-image">
            <img srcset="./images/header-pic.png 2x" alt="" />
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import './sass/app.scss';
export default {};
</script>