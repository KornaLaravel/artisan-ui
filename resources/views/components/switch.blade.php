<div x-data="switchInput({{$attributes->has('checked') ? 'true' : 'false'}}, {{$attributes->has('disabled') ? 'true' : 'false'}})"
    {{$attributes->except(['name', 'checked', 'disabled', 'id'])->class(['flex items-center space-x-2 w-fit'])}}>
    <input type="checkbox" class="hidden" x-ref="input" x-bind="input" @if ($attributes->has('name'))
    name="{{$attributes->get('name')}}"
    @endif @if ($attributes->has('id')) id="{{$attributes->get('id')}}" @endif >

    <button x-ref="trigger" type="button" x-bind="trigger"
        :class="{'bg-primary': switchOn,  'bg-input' : !switchOn, 'opacity-60' : disabled}"
        class="inline-flex h-6 py-0.5 rounded-full w-10 accent-accent">
        <span :class="{'translate-x-[18px] bg-background': switchOn,  'translate-x-0.5 bg-background' : !switchOn}"
            class="w-5 h-5 duration-200 ease-in-out rounded-full shadow-md"></span>
    </button>
</div>
