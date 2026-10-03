
@php
    use Illuminate\Support\Str;
    $path = explode('/', request()->path());
    // Para rutas tipo: ecommerce/{slug} → $path[1]
    $currentCategorySlug = $path[1] ?? '';
@endphp
<div class="container">
    <div class="row">
        <nav class="main-nav flex-grow-1">
            <ul class="all-category my-0 pb-4 mx-0 px-0">
                <li class="title-category">Nuestras Categorias</li>
                <li style="cursor:pointer;" onclick="window.location='{{ route('tenant.ecommerce.index') }}'">
                    <a href="{{ route('tenant.ecommerce.index') }}" class="{{ $currentCategorySlug == '' ? 'bg-success text-light' : '' }}">Ver todos</a>
                </li>
            </ul>
            <div class="container">
                <div class="category-scroller">
                <button type="button" class="category-scroller__arrow category-scroller__arrow--prev" aria-label="Ver categorías anteriores" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6l6 6" /></svg>
                </button>
                <ul id="scrollContainer" class="menu restaurante sf-arrows sf-js-enabled" style="touch-action: pan-y;">
                @foreach ($categories_list as $category)
                    @php $categorySlug = \Illuminate\Support\Str::slug($category->name, '-'); @endphp
                    <li class="menu-item ecommerce {{ $currentCategorySlug == $categorySlug ? 'selected-category' : '' }}" style="cursor:pointer;" onclick="window.location='{{ route('tenant.ecommerce.category', $categorySlug) }}'">
                        <a href="{{ route('tenant.ecommerce.category', $categorySlug) }}" title="{{ $category->name }}">
                            @if($category->image && file_exists(public_path('storage/uploads/categories/'. $category->image)))
                                <img class="category-logo" src="{{ asset('storage/uploads/categories/'. $category->image) }}" alt="{{$category->name}}" draggable="false">
                            @else
                                <img class="category-logo" src="{{ asset('logo/Image_not_available.png') }}" alt="{{$category->name}}" draggable="false">
                            @endif
                            <span class="category-name">{{ $category->name }}</span>
                        </a>
                    </li>
                @endforeach
                </ul>
                <button type="button" class="category-scroller__arrow category-scroller__arrow--next" aria-label="Ver más categorías" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6l-6 6" /></svg>
                </button>
                </div>
            </div>
        </nav>
    </div>
</div>
<!-- codigo para el scroll de las categorias -->
<script>
  const container = document.getElementById('scrollContainer');

let isDragging = false;
let startX;
let scrollLeft;

// Evento de mouse down
container.addEventListener('mousedown', (e) => {
    isDragging = true;
    container.classList.add('active');
    startX = e.pageX - container.offsetLeft; // Punto de partida relativo al contenedor
    scrollLeft = container.scrollLeft;      // Desplazamiento actual
});

// Evento de mouse move
container.addEventListener('mousemove', (e) => {
    if (!isDragging) return; // Si no está arrastrando, no hacer nada
    e.preventDefault(); // Evitar selección de texto mientras arrastras
    const x = e.pageX - container.offsetLeft; // Posición actual
    const walk = (x - startX) * 2; // Distancia movida, ajustada para mayor sensibilidad
    container.scrollLeft = scrollLeft - walk;
});

// Evento de mouse up / mouse leave
['mouseup', 'mouseleave'].forEach(event => {
    container.addEventListener(event, () => {
        isDragging = false;
    });
});

(function () {
    const prev = document.querySelector('.category-scroller__arrow--prev');
    const next = document.querySelector('.category-scroller__arrow--next');
    if (!container || !prev || !next) return;

    const updateArrows = () => {
        const max = container.scrollWidth - container.clientWidth;
        prev.disabled = container.scrollLeft <= 1;
        next.disabled = container.scrollLeft >= max - 1;
    };
    const step = () => Math.max(container.clientWidth * 0.8, 140);

    prev.addEventListener('click', () => container.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => container.scrollBy({ left: step(), behavior: 'smooth' }));
    container.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    window.addEventListener('load', updateArrows);
    updateArrows();
})();
// //arrar de imagenes de categorias
// const images = {
//     'Bebidas': `{{ asset('images/bebidas_cat.png') }}`,
//     'Brasas': `{{ asset('images/brasas_cat.png') }}`,
//     'Comida rápida': `{{ asset('images/comida_rapida_cat.png') }}`,
//     'Pizzas': `{{ asset('images/pizzas_cat.png') }}`,
//     'Makis': `{{ asset('images/makis_cat.png') }}`,
//     'Ensaladas': `{{ asset('images/ensaladas_cat.png') }}`,
//     'Salmones': `{{ asset('images/salmones_cat.png') }}`,
//     'Hamburguesas': `{{ asset('images/hamburguesa_cat.png') }}`,
//     'Caldos': `{{ asset('images/caldos_cat.png') }}`,
// };
// // console.log(images);

// //mostar las imagenes del array images dentro de una etiqueta img que esta dentro de un li
// const lis = document.querySelectorAll('.menu li a');
// lis.forEach((li, index) => {
//     const category = li.textContent.trim();
//     // console.log(category);
//     const img = document.createElement('img');
//     img.src = images[category];
//     // console.log(img.src);
//     img.style.width = '75px';
//     img.style.height = 'auto';
//     img.draggable = false;
//     li.prepend(img);
// });

</script>
