import {SparqlBindings} from './sparql_bindings';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class SparqlResponse {

    @JsonProperty('results', SparqlBindings)
    results: SparqlBindings = undefined;

}
