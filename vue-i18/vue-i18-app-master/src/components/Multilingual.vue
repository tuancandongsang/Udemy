<template>
  <div>
    {{ $t('message.value', { value: 'This is an example of content translation ' }) }}
    <h1>
      {{ $t('message.smg', { smg: 'hello english' }) }}
    </h1>
    <h2> anho anho</h2>
  </div>
</template>

<script>
export default {
  name: 'Multilingual'
}
</script>