<template>
  <div>
    <div>
        <img class="lg:tw-h-80 md:tw-h-72 tw-h-48 tw-w-full tw-object-bottom tw-object-cover" src="https://www.home-designing.com/wp-content/uploads/2016/04/NaturalLightLoftLivingroom.jpg" alt="">
    </div>

    <div class="lg:tw-mt-16 md:tw-mt-12 tw-mt-8">
        <products-catalog-header />
        <hr class="tw-my-8">
        <div class="tw-pb-6 tw-grid lg:tw-grid-cols-3 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-8">
            <product-card v-for="item in 12" :key="item" :id="item"/>
        </div>
    </div>
  </div>
</template>

<script>
import ProductsCatalogHeader from '@/components/Headers/ProductsCatalogHeader.vue'
import ProductCard from '@/components/Cards/ProductCard.vue'
export default {
  components: { ProductsCatalogHeader, ProductCard },

}
</script>

<style>

</style>