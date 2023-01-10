<script lang="ts">
    import { Route, Link } from 'svelte-routing';
    import AccessDenied from './AccessDenied.svelte';
    import { storeData } from '../stores';

    export let path;
    export let component;

    $: isAuthenticated = $storeData;
</script>

{#if isAuthenticated}
    <Route path={path} component={component} />
{:else}
    <Route path={path} component={AccessDenied} />
{/if}