<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
    import { Section, Faq, FaqItem } from 'flowbite-svelte-blocks';
</script>

<div class="m-5">
	<Section name="crudcreateform">
		<h2 class="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
			プライバシーポリシー
		</h2>
		<Faq>
			<div>
				<FaqItem>
					<svelte:fragment slot="h3">免責事項</svelte:fragment>
					<p class="text-gray-500 dark:text-gray-400">
						当サイトで提供される情報について一切の責任を負いません。
					</p>
                    <p class="text-gray-500 dark:text-gray-400">
						当サイトのコンテンツについて、できる限り正確な情報を提供するよう努めていますが、正確性や安全性を保障するものではありません。
					</p>
				</FaqItem>
				<FaqItem>
					<svelte:fragment slot="h3">リンクについて</svelte:fragment
					>
					<p class="text-gray-500 dark:text-gray-400">
                        当サイトはフリーリンクです。リンクを行う際の連絡は不要です。
					</p>
				</FaqItem>
			</div>
		</Faq>
	</Section>

    <Footer />
</div>

