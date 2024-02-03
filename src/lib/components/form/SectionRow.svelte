<script lang="ts">
    import type { IPalworldFormFieldSetting } from "$lib/types";

    export let fieldSetting: IPalworldFormFieldSetting;
</script>

<div class="sm:col-span-2">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white">{fieldSetting.label}</h2>
</div>