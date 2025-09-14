# htmxlike

HTMLX but in under 500 bytes and JSON-friendly.

## Keywords

Assume `/quote` returns a JSON response like

```json
{
    "quote": "Hope is the spark that ignites our dreams.",
    "author": "Riko Tanaka"
}
```

### `o-action`

Consists of the method and the URL to call. The method is optional, defaulting to `GET`.

```html
<button o-method="GET /quote" >
    Clickme
</button>
```

### `o-ref`

Optional parameter to specify the ID of the element to which the received data should be applied. If missing, data is applied to the element itself.

```html
<button o-method="GET /quote" o-ref="quotebox">
    Clickme
</button>

<quote id="quotebox"></quote>
```

### `o-prop`

Parameter to specify which property of the received object should be applied to the target element.

```html
<button o-method="GET /quote" o-ref="quotebox">
    Clickme
</button>

<quote id="quotebox">
    <p o-prop="quote"></p>
    <cite o-prop="author"></cite>
</quote>
```

Properties are stringified with `String(value)` and applied as the `.innerText` of the target element.
