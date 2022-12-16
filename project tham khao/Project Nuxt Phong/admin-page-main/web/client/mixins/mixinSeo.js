export default {
  data() {
    return {
      seoData: {
        title: "",
        metaTitle: "",
        metaDescription: "",
        metaImage: {
          data: {
            attributes: {
              url: "",
            },
          },
        },
        meta: [],
      },
    };
  },
  head() {
    return {
      title: this.seoData.title,
      meta: [
        {
          name: "title",
          content: this.seoData.metaTitle,
        },
        {
          name: "description",
          content: this.seoData.metaDescription,
        },
        {
          property: "og:image",
          content: this.seoData.metaImage ? this.seoData.metaImage.data.attributes.url : "",
        },
        ...this.seoData.meta.map((meta) => {
          return { property: meta.name, content: meta.value };
        }),
      ],
    };
  },
};
