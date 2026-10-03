@php
    $configurationModel = \App\Models\Tenant\Configuration::first();
    $ecommerceConfiguration = $ecommerceConfiguration ?? ($configEcommerce ?? \App\Models\Tenant\ConfigurationEcommerce::first());
    $phoneWhatsapp = $ecommerceConfiguration->phone_whatsapp ?? $configurationModel->phone_whatsapp ?? null;
    $defaultImage = $configurationModel->product_default_image ?? 'imagen-no-disponible.jpg';
    $defaultImagePath = $defaultImage === 'imagen-no-disponible.jpg'
        ? asset('logo/imagen-no-disponible.jpg')
        : asset('storage/defaults/' . $defaultImage);
    $mainImagePath = ($record->image && $record->image !== 'imagen-no-disponible.jpg')
        ? asset('storage/uploads/items/'.$record->image)
        : $defaultImagePath;
@endphp
<div class="product-single-container product-single-default product-quick-view container position-relative p-0">
    <div class="row mx-0">
        <div class="col-lg-6 col-md-6 product-single-gallery px-5 py-5 preview-img-container">
            <div class="product-slider-container product-item">
                <div class="product-single-carousel owl-carousel owl-theme">
                    <div class="product-item">
                        <img class="product-single-image" src="{{ $mainImagePath }}"
                             data-zoom-image="{{ $mainImagePath }}" alt="{{ $record->description }}" />
                    </div>

                    @foreach($record->images as $row)

                    <div class="product-item">
                        @php
                            $loopImagePath = ($row->image && $row->image !== 'imagen-no-disponible.jpg')
                                ? asset('storage/uploads/items/'.$row->image)
                                : $defaultImagePath;
                        @endphp
                        <img class="product-single-image"
                             src="{{ $loopImagePath }}"
                             data-zoom-image="{{ $loopImagePath }}" alt="{{ $record->description }}" />
                    </div>

                    @endforeach

                    <!--<div class="product-item">
                        <img class="product-single-image"
                            src="{{ asset('storage/uploads/items/'.$record->image_medium) }}"
                            data-zoom-image="{{ asset('storage/uploads/items/'.$record->image_medium) }}" />
                    </div> -->

                </div>

            </div>
            @if($record->images->count() > 0)
            <div class="prod-thumbnail row owl-dots" id='carousel-custom-dots'>
                <div class="col-3 owl-dot">
                    <img src="{{ $mainImagePath }}" alt="{{ $record->description }}" />
                </div>

                @foreach($record->images as $row)

                    <div class="col-3 owl-dot">
                        @php
                            $thumbImagePath = ($row->image && $row->image !== 'imagen-no-disponible.jpg')
                                ? asset('storage/uploads/items/'.$row->image)
                                : $defaultImagePath;
                        @endphp
                        <img src="{{ $thumbImagePath }}" alt="{{ $record->description }}" />
                    </div>

                @endforeach

                <!--<div class="col-3 owl-dot">
                    <img src="{{ asset('porto_ecommerce/ajax/assets/images/products/zoom/product-2.html') }}" />
                </div>
                <div class="col-3 owl-dot">
                    <img src="{{ asset('porto_ecommerce/ajax/assets/images/products/zoom/product-3.html') }}" />
                </div>
                <div class="col-3 owl-dot">
                    <img src="{{ asset('porto_ecommerce/ajax/assets/images/products/zoom/product-4.html') }}" />
                </div>-->
            </div>
            @endif
        </div><!-- End .col-lg-7 -->

        <div class="col-lg-6 col-md-6 px-5 py-5">
            <div class="product-single-details pdp-panel mt-0">
                @php
                    $activeCampaign = null;
                    $hasActiveOffer = false;
                    $activeOfferPrice = (float) $record->sale_unit_price;
                    $compareAtPrice = null;
                    $offerExpiresAt = null;
                    $stock = (float) $record->getStockByWarehouseMain();
                    $stockThreshold = 10;

                    if (isset($campaigns) && count($campaigns) > 0) {
                        $activeCampaign = $campaigns instanceof \Illuminate\Support\Collection
                            ? $campaigns->first()
                            : (is_array($campaigns) ? ($campaigns[0] ?? null) : $campaigns);
                    }

                    if ($activeCampaign) {
                        $stockThreshold = method_exists($activeCampaign, 'stockThreshold')
                            ? $activeCampaign->stockThreshold()
                            : (int) ($activeCampaign->sp_stock_threshold ?: 10);

                        if (method_exists($activeCampaign, 'hasActiveDiscount')
                            ? $activeCampaign->hasActiveDiscount()
                            : ($activeCampaign->sp_discount_price && (! $activeCampaign->end_date || $activeCampaign->end_date > now()))
                        ) {
                            $hasActiveOffer = true;
                            $activeOfferPrice = method_exists($activeCampaign, 'discountedPrice')
                                ? $activeCampaign->discountedPrice((float) $record->sale_unit_price)
                                : (float) $record->sale_unit_price;
                            $compareAtPrice = method_exists($activeCampaign, 'compareAtPrice')
                                ? $activeCampaign->compareAtPrice((float) $record->sale_unit_price)
                                : null;
                            if (! $compareAtPrice) {
                                $hasActiveOffer = false;
                            }
                        }

                        // Evergreen: si venció, rollForwardCountdownIfNeeded ya sumó +1 día en el modelo.
                        if (method_exists($activeCampaign, 'hasActiveCountdown')
                            ? $activeCampaign->hasActiveCountdown()
                            : ($activeCampaign->sp_countdown && $activeCampaign->end_date && $activeCampaign->end_date > now())
                        ) {
                            $offerExpiresAt = $activeCampaign->end_date;
                        }
                    }

                    $campaignPricing = app(\Modules\Ecommerce\Services\CampaignPriceService::class)->forItem($record);
                    $activeOfferPrice = $campaignPricing['final_price'];
                    $compareAtPrice = $campaignPricing['compare_at_price'];
                    $hasActiveOffer = $campaignPricing['has_social_proof_price'] || $campaignPricing['has_real_discount'];
                    $displayPrice = (float) $activeOfferPrice;
                    $oldPrice = ($hasActiveOffer && $compareAtPrice) ? (float) $compareAtPrice : null;
                    $showPrices = $storefront_show_prices ?? true;
                    $ratingCount = rand(45, 120);
                    $purchaseCount = $activeCampaign
                        ? rand((int) $activeCampaign->sp_purchase_min, max((int) $activeCampaign->sp_purchase_min, (int) $activeCampaign->sp_purchase_max))
                        : 0;
                    $viewersCount = $activeCampaign
                        ? rand((int) $activeCampaign->sp_views_min, max((int) $activeCampaign->sp_views_min, (int) $activeCampaign->sp_views_max))
                        : 0;
                    $currencySymbol = optional($record->currency_type)->symbol ?? 'S/';
                    $discountPercent = ($oldPrice !== null && $oldPrice > $displayPrice) ? (int) round((1 - $displayPrice / $oldPrice) * 100) : 0;

                    $qvProduct = [
                        'id' => $record->id,
                        'description' => $record->description,
                        'sale_unit_price' => $displayPrice,
                        'original_price' => (float) $record->sale_unit_price,
                        'compare_at_price' => $compareAtPrice,
                        'discount_campaign_id' => $campaignPricing['discount_campaign_id'],
                        'discount_campaign_name' => $campaignPricing['discount_campaign_name'],
                        'campaign_discount_percent' => $campaignPricing['real_discount_percentage'],
                        'campaign_discount_embedded' => $campaignPricing['has_real_discount'],
                        'has_discount' => $hasActiveOffer,
                        'discount_percent' => $campaignPricing['real_discount_percentage'],
                        'image' => $record->image,
                        'image_small' => $record->image_small ?? $record->image,
                        'image_medium' => $record->image_medium ?? $record->image,
                        'currency_type_id' => $record->currency_type_id ?? 'PEN',
                        'currency_type_symbol' => optional($record->currency_type)->symbol ?? 'S/',
                        'sale_affectation_igv_type_id' => $record->sale_affectation_igv_type_id ?? '10',
                        'unit_type_id' => $record->unit_type_id ?? 'NIU',
                        'internal_id' => $record->internal_id,
                        'stock' => (int) $stock,
                    ];
                @endphp

                <div class="pdp-head">
                    @if(($record->brand && $record->brand->id) || !empty($record->internal_id))
                    <div class="pdp-eyebrow">
                        @if ($record->brand && $record->brand->id)
                            <a class="pdp-brand" href="{{ route('tenant.ecommerce.brand', ['id' => $record->brand->id, 'slug' => \Illuminate\Support\Str::slug($record->brand->name)]) }}">{{ $record->brand->name }}</a>
                        @endif
                        @if(!empty($record->internal_id))
                            <span class="pdp-sku">SKU {{ $record->internal_id }}</span>
                        @endif
                    </div>
                    @endif

                    <h1 class="product-title pdp-title">{{ $record->description }}</h1>

                    @if($activeCampaign && $activeCampaign->sp_rating)
                    <div class="pdp-score">
                        <span class="pdp-score-stars" aria-hidden="true">@for ($star = 0; $star < 5; $star++)<svg class="pdp-star" viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"/></svg>@endfor</span>
                        <span class="pdp-score-value">5.0</span>
                        <span class="pdp-score-count"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20l-3 -3h-2a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-2l-3 3z"/></svg>{{ $ratingCount }} opiniones</span>
                    </div>
                    @endif
                </div>

                @if($showPrices)
                <div class="pdp-amount-block">
                    <div class="pdp-amount-row">
                        <span class="pdp-amount">{{ $currencySymbol }} {{ number_format($displayPrice, 2) }}</span>
                        @if($discountPercent > 0)
                            <span class="pdp-amount-old">{{ $currencySymbol }} {{ number_format($oldPrice, 2) }}</span>
                            <span class="pdp-amount-off">-{{ $discountPercent }}%</span>
                        @endif
                    </div>

                    @if($offerExpiresAt)
                    <div class="pdp-timer" id="sp-countdown-qv-{{ $record->id }}">
                        <span class="pdp-timer-label"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>La oferta termina en</span>
                        <span class="pdp-timer-clock">
                            <span class="pdp-timer-unit"><b data-countdown="days">00</b><small>días</small></span>
                            <span class="pdp-timer-unit"><b data-countdown="hours">00</b><small>hrs</small></span>
                            <span class="pdp-timer-unit"><b data-countdown="minutes">00</b><small>min</small></span>
                            <span class="pdp-timer-unit"><b data-countdown="seconds">00</b><small>seg</small></span>
                        </span>
                    </div>
                    @endif
                </div>
                @endif

                <dl class="pdp-meta">
                    @if ($record->category && $record->category->name)
                    <div class="pdp-meta-item">
                        <dt>Categoría</dt>
                        <dd><a href="{{ route('tenant.ecommerce.category', \Illuminate\Support\Str::slug($record->category->name, '-')) }}">{{ $record->category->name }}</a></dd>
                    </div>
                    @endif
                    @if (!empty($record->model))
                    <div class="pdp-meta-item">
                        <dt>Colección</dt>
                        <dd>{{ $record->model }}</dd>
                    </div>
                    @endif
                    <div class="pdp-meta-item">
                        <dt>Disponibilidad</dt>
                        <dd>
                            @if($stock > 0)
                                <span class="pdp-avail pdp-avail--in">En stock</span>
                                @if($storefront_show_stock ?? false)
                                <span class="pdp-avail-qty">{{ number_format($stock, 0) }} unid.</span>
                                @endif
                                @if($activeCampaign && $activeCampaign->sp_stock_alert && $stock <= $stockThreshold)
                                    <span class="pdp-avail-low">últimas unidades</span>
                                @endif
                            @else
                                <span class="pdp-avail pdp-avail--out">Sin stock</span>
                            @endif
                        </dd>
                    </div>
                </dl>

                @if(filled(strip_tags($record->name)))
                <div class="pdp-description">{!! $record->name !!}</div>
                @endif

                @if($activeCampaign && ($activeCampaign->sp_views_count || $activeCampaign->sp_purchase_count))
                <p class="pdp-activity">
                    <span class="pdp-live-dot" aria-hidden="true"></span>
                    @if($activeCampaign->sp_views_count)
                        <span class="pdp-activity-item"><strong id="sp-viewers-qv-{{ $record->id }}">{{ $viewersCount }}</strong> viendo ahora</span>
                    @endif
                    @if($activeCampaign->sp_views_count && $activeCampaign->sp_purchase_count)
                        <span class="pdp-activity-sep">·</span>
                    @endif
                    @if($activeCampaign->sp_purchase_count)
                        <span class="pdp-activity-item"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 7h12l-1 13H7L6 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg><strong>{{ $purchaseCount }}</strong> compras esta semana</span>
                    @endif
                </p>
                @endif

                <div class="pdp-actions product-action"
                    data-qv-scope
                    data-show-price="{{ $showPrices ? 1 : 0 }}"
                    data-unit-price="{{ $displayPrice }}"
                    data-symbol="{{ $currencySymbol }}"
                    data-qv-product="{{ e(json_encode($qvProduct)) }}">
                    @php
                        $stockQv = $stock;
                        $showWhatsapp = ($configurationModel->enable_whatsapp ?? false) && !empty($phoneWhatsapp);
                        if ($showWhatsapp) {
                            $waPhoneRaw = preg_replace('/\D+/', '', $phoneWhatsapp);
                            $waPhone = (strlen($waPhoneRaw) == 9 && str_starts_with($waPhoneRaw, '9')) ? '51'.$waPhoneRaw : $waPhoneRaw;
                            $symbol = optional($record->currency_type)->symbol ?? 'S/';
                            $waText = rawurlencode(
                                ($storefront_show_prices ?? true)
                                    ? "Buenas, deseo consultar acerca del producto *{$record->description}*, con precio de {$symbol}{$displayPrice}. ¿Podrían brindarme más información?"
                                    : "Buenas, deseo consultar acerca del producto *{$record->description}*. ¿Podrían brindarme más información?"
                            );
                            $waLink = "https://wa.me/{$waPhone}?text={$waText}";
                        }
                    @endphp
                    @if($stockQv > 0)
                    <div class="pdp-buy">
                        <div class="input-group input-group-sm modern-quantity-container w-auto">
                            <div class="input-group-prepend">
                                <button class="btn btn-outline-secondary btn-input-group" type="button" onclick="qvStep(this, -1)" title="Disminuir cantidad">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /></svg>
                                </button>
                            </div>
                            <input class="input-quantity text-center qv-quantity" type="number" min="1" value="1" aria-label="Cantidad"
                                oninput="qvUpdatePrice(qvScope(this))" onchange="qvSync(this)">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary btn-input-group" type="button" onclick="qvStep(this, 1)" title="Aumentar cantidad">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                                </button>
                            </div>
                        </div>

                        <a href="javascript:void(0)" role="button" onclick="event.preventDefault(); qvAddToCart(this); return false;" class="paction add-cart pdp-cta" title="Agregar al carrito">
                            <span class="qv-add-label">
                                @if($showPrices)
                                    Agregar a Carrito · {{ $currencySymbol }} {{ number_format($displayPrice, 2) }}
                                @else
                                    Agregar a Carrito
                                @endif
                            </span>
                        </a>
                    </div>
                    @else
                    <div class="d-flex flex-column w-100" style="gap: 10px">
                        <button class="btn btn-disabled">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-mood-sad" style="margin-top: -2px"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 10l.01 0" /><path d="M15 10l.01 0" /><path d="M9.5 15.25a3.5 3.5 0 0 1 5 0" /></svg>
                            Agotado por ahora
                        </button>

                        <button type="button" class="btn btn-outline-primary" onclick="jQuery.magnificPopup.close()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-search" style="margin-top: -2px"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                            Seguir buscando
                        </button>
                    </div>
                    @endif

                    @if($showWhatsapp)
                        <a href="{{ $waLink }}" class="btn-whatsapp pdp-whatsapp" target="_blank" rel="noopener" title="Consultar por WhatsApp">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
                            <span>Consultar por WhatsApp</span>
                        </a>
                    @endif

                </div><!-- End .pdp-actions -->

            </div><!-- End .product-single-details -->
        </div><!-- End .col-lg-5 -->
    </div><!-- End .row -->

@if($offerExpiresAt)
<script>
(function () {
    var targetDate = {{ (int) \Carbon\Carbon::parse($offerExpiresAt)->getTimestamp() }} * 1000;
    var dayMs = 24 * 60 * 60 * 1000;
    var root = document.getElementById('sp-countdown-qv-{{ $record->id }}');
    if (!root) return;
    var units = {};
    ['days', 'hours', 'minutes', 'seconds'].forEach(function (name) {
        units[name] = root.querySelector('[data-countdown="' + name + '"]');
    });
    var pad = function (value) { return String(value).padStart(2, '0'); };
    var timer;
    var tick = function () {
        if (!document.body.contains(root)) return clearInterval(timer);
        // Evergreen: al vencer, +1 día a la misma hora y el contador sigue.
        while (targetDate <= Date.now()) {
            targetDate += dayMs;
        }
        var difference = targetDate - Date.now();
        units.days.textContent = pad(Math.floor(difference / dayMs));
        units.hours.textContent = pad(Math.floor((difference % dayMs) / (1000 * 60 * 60)));
        units.minutes.textContent = pad(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
        units.seconds.textContent = pad(Math.floor((difference % (1000 * 60)) / 1000));
    };
    tick();
    timer = setInterval(tick, 1000);
})();
</script>
@endif
</div>
