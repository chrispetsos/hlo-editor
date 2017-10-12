import {Constraint} from './constraint';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class SparqlBindings {

    @JsonProperty('bindings', [Constraint])
    constraints: Constraint[] = undefined;

}
