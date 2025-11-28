# htmxlike

HTMLX but in under 1 KB and JSON-friendly.

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

If the response JSON is nested, you can use `.` to access nested properties:

```json
{
    "quote": {
        "text": "Hope is the spark that ignites our dreams.",
        "author": "Riko Tanaka"
    }
}
```

```html
<button o-method="GET /quote" o-ref="quotebox">
    Clickme
</button>

<quote id="quotebox">
    <p o-prop="quote.text"></p>
    <cite o-prop="quote.author"></cite>
</quote>
```

HTMXLike currently does not support arrays.

### `o-class-*`

Parameter to specify what classes (if any) should be added to the target element depending on the status of the request.

| Attribute | Description |
| --- | --- |
| `o-class-error` | Request did not return a 2XX status code; request or JSON parsing threw an error. |
| `o-class-loading` | Added before the request starts; removed when the request finishes. |
| `o-class-success` | Added when the request finishes successfully. |

```html
<button o-method="GET /quote" o-ref="quotebox">
    Clickme
</button>

<quote 
    id="quotebox"
    o-class-error="error"
    o-class-loading="loading"
    o-class-success="success"
>
    <p o-prop="quote"></p>
    <cite o-prop="author"></cite>
</quote>
```
