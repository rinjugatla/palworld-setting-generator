<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import { Li, List } from 'flowbite-svelte';
	import { Section, Faq, FaqItem } from 'flowbite-svelte-blocks';

    const discordAccount = '&#64;&#114;&#105;&#110;&#95;&#106;&#117;&#103;&#97;&#116;&#108;&#97;';
    const mailAddress = '&#112;&#97;&#108;&#46;&#119;&#105;&#115;&#104;&#108;&#105;&#115;&#116;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;';

	/**
	 * 支援者様
	 */
	const supporters = ['揚げポテGameSV'];
</script>

<div class="m-5">
	<Section name="crudcreateform">
		<h2 class="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
			開発支援
		</h2>
		<Faq>
			<div>
				<FaqItem>
					<svelte:fragment slot="h3">支援者様(順不同)</svelte:fragment>
					<List tag="ol" class="mt-2 space-y-1 ps-5">
						{#each supporters as supporter}
							<Li>{supporter} さま</Li>
						{/each}
					</List>
				</FaqItem>
			</div>
		</Faq>
	</Section>

	<Footer />
</div>
