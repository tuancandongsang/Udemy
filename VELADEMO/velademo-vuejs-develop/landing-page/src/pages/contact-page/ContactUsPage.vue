<template>
  <div class="contact">
    <div class="contact-map">
      <div>
        <iframe
          class="contact-map__content"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.067992314257!2d105.78381241538528!3d21.029965293111875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4c684b8ceb%3A0xef4622cd15bdb0ce!2zODAgUC4gROG7i2NoIFbhu41uZyBI4bqtdSwgROG7i2NoIFbhu41uZyBI4bqtdSwgQ-G6p3UgR2nhuqV5LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1661743985115!5m2!1svi!2s"
          width="600"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    <div class="contact-info">
      <div class="container">
        <div class="contact-info-control d-flex flex-wrap">
          <div class="col-xxl-5 col-xl-5 col-lg-5 col-md-12">
            <div class="contact-info-control-left">
              <h1 class="contact-info-control-left__title">Contact Us</h1>
              <div class="d-flex flex-wrap">
                <div class="col-xs-12">
                  <p>
                    Nor again is there anyone who loves or pursues or desires to
                    obtain pain of itself, because it is pain.no annoying
                    consequences.<br /><br />
                  </p>
                  <p>
                    <strong>Add:</strong> No 80 Dich Vong Hau Street, Cau Giay
                    District, Ha Noi
                  </p>
                  <p><strong>Phone:</strong> (399) 573 5586</p>
                  <p><strong>Email:</strong> henry_84@example.com</p>
                  <p><strong>Open:</strong> 8am - 7pm, Mon - Sat</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-7 col-xl-7 col-lg-7 col-md-12">
            <div class="contact-info-control-right">
              <form action="">
                <div class="row">
                  <div class="col-xs-12">
                    <div class="mb-4">
                      <input
                        type="text"
                        class="form-control contact-info-control-right__control"
                        placeholder="Name"
                        required
                        autofocus
                      />
                    </div>
                  </div>
                  <div class="col-xs-12">
                    <div class="mb-4">
                      <input
                        type="email"
                        class="form-control contact-info-control-right__control"
                        placeholder="Email"
                        required
                        autofocus
                      />
                    </div>
                  </div>
                  <div class="col-xs-12">
                    <div class="mb-4">
                      <textarea
                        rows="6"
                        class="form-control contact-info-control-right__control"
                        placeholder="Message"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="contact-info-control-right-button">
                  <input
                    type="submit"
                    class="btn contact-info-control-right-button__message"
                    value="Send Message"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./contact.scss";
</script>
