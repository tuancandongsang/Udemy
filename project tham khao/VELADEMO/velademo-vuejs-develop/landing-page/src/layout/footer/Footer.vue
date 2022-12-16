<template>
  <footer>
    <div class="menus">
      <div class="container">
        <div class="row">
          <div class="col-xxl-3 col-xl-3 col-lg-5 col-md-5 col-sm-5 col-12">
            <div class="item">
              <div class="logo">
                <RouterLink to="/">
                  <img alt="rubix" src="../../assets/images/logo-footer.png" />
                </RouterLink>
              </div>
              <div class="social">
                <ul>
                  <li>
                    <a href="#">
                      <img
                        src="../../assets/images/facebook-w.png"
                        alt="facebook"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="../../assets/images/twitter-w.png"
                        alt="twitter"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="../../assets/images/youtube-w.png"
                        alt="youtube"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            class="col-xxl-3 col-xl-3 col-lg-1 col-md-1 col-sm-1 col-12"
          ></div>
          <div
            class="col-xxl-3 col-xl-3 col-lg-1 col-md-1 col-sm-1 col-12"
          ></div>
          <div class="col-xxl-3 col-xl-3 col-lg-5 col-md-5 col-sm-5 col-12">
            <div class="item">
              <h5>More From Rubix</h5>
              <div class="info">
                <h6>Let's Talk</h6>
                <div class="phone">
                  <div class="icon">
                    <img
                      src="../../assets/images/headphone.png"
                      alt="headphone"
                    />
                  </div>
                  <div class="mail">
                    <p>+391 (0)35 2568 4593</p>
                    <p>hello@domain.com</p>
                  </div>
                </div>
              </div>
              <div class="address">
                <h6>Find Us</h6>
                <div class="body">
                  <div class="icon">
                    <img src="../../assets/images/marker.png" alt="marker" />
                  </div>
                  <p>
                    502 New Design Str <br />
                    Melbourne, Australia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright text-center">
      <span>@2020 Rubix.</span> All Rights Reserved
    </div>
  </footer>
</template>

<script lang="ts">
import "./footer.scss";
</script>
