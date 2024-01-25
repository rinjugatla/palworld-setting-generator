<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import { Li, List } from 'flowbite-svelte';
	import { Section, Faq, FaqItem } from 'flowbite-svelte-blocks';

    const discordAccount = '&#64;&#114;&#105;&#110;&#95;&#106;&#117;&#103;&#97;&#116;&#108;&#97;';
    const mailAddress = '&#112;&#97;&#108;&#46;&#119;&#105;&#115;&#104;&#108;&#105;&#115;&#116;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;';
</script>

<div class="m-5">
	<Section name="crudcreateform">
		<h2 class="mb-8 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
			開発支援
		</h2>
		<Faq>
			<div>
				<FaqItem>
					<svelte:fragment slot="h3">開発支援</svelte:fragment>
					<p class="text-gray-500 dark:text-gray-400">
						継続的な開発のために支援していただけると大変助かります。<br />
						支援していただいた方に以下のお礼をさせていただきます。<br />
						お礼の内容は予告なく変更される場合があります。
					</p>

					<List tag="ul" class="mb-2 space-y-2 text-gray-500 dark:text-gray-400">
						<Li>
							支援者様リストへのお名前の掲載
							<List tag="ol" class="mt-2 space-y-1 ps-5">
								<Li>希望される方のみになります。</Li>
								<Li>公序良俗に反するお名前は掲載できません。ご了承ください。</Li>
							</List>
						</Li>
					</List>
					<List tag="ul" class="mb-2 space-y-2 text-gray-500 dark:text-gray-400">
						<Li>
							Palworldサーバ関係についてのDiscordのDMによるサポート
							<List tag="ol" class="mt-2 space-y-1 ps-5">
								<Li>5000円以上の支援をしていただいた方のみになります。</Li>
                                <Li>問題の解決をお約束するものではありません。</Li>
								<Li>永続的なサポートはできません。</Li>
								<Li>即座のサポートを保証しません。</Li>
							</List>
						</Li>
					</List>
				</FaqItem>

				<FaqItem>
					<svelte:fragment slot="h3">支援方法</svelte:fragment>
					<p class="text-gray-500 dark:text-gray-400">
						Amazonの欲しいものリストからギフトを購入していただきます。
					</p>
					<a
						class="font-bold text-blue-900"
						href="https://www.amazon.jp/hz/wishlist/ls/S7DCPCAFME8X?ref_=wl_share"
						target="_blank"
						rel="noopener noreferrer">Amazon欲しいものリスト</a
					>
                    <List tag="ul" class="mb-2 space-y-2 text-gray-500 dark:text-gray-400">
						<Li>
							使い方
							<List tag="ol" class="mt-2 space-y-1 ps-5">
								<Li>メールアドレスタイプの場合は「{@html mailAddress}」を送り先にしてください。</Li>
								<Li>支援者リストに掲載希望の方は掲載名を記載してください。</Li>
                                <Li>DiscordのDMサポートを希望の方はDiscordアカウント名を記載してください。</Li>
                                <Li>お礼はギフトを確認してからの対応になります。</Li>
                                <Li>不明な点はDiscord {@html discordAccount} までお問い合わせください。</Li>
							</List>
						</Li>
					</List>
				</FaqItem>

				<FaqItem>
					<svelte:fragment slot="h3">支援者様(順不同)</svelte:fragment>
					<p class="text-gray-500 dark:text-gray-400"></p>
				</FaqItem>
			</div>
		</Faq>
	</Section>

	<Footer />
</div>
